//get_option_html.ts 변경
import { PrismaClient, ProductOptionName, ProductOptionValue, Product } from "@prisma/client";
import { DocDB } from "aws-sdk";
import { getValidUploadImageUrl } from "../../../graphql";
export async function getOptionHeaderHtmlByProductId(prisma: PrismaClient, id: number, twoWays: string, indexType: number): Promise<string> {
    const optionValues = await prisma.productOptionValue.findMany({
        where: { productOptionName: { productId: id }, isActive: true },
        include: { productOptionName: true },
        orderBy: [{ number: "asc" }]
    });

    return getOptionHeaderHtml(optionValues, twoWays, indexType)
}




export function getOptionHeaderHtml(optionValues: (ProductOptionValue & { productOptionName: ProductOptionName })[], twoWays: string, indexType: number): string {
    const hasImageOrder = optionValues.find(v => v.image !== null)?.optionNameOrder;
    
    if (hasImageOrder) {
        const options = optionValues.filter(v => v.optionNameOrder === hasImageOrder);

        var output = `
            <p>
                &nbsp;
            </p>

            <p>
                &nbsp;
            </p>

            <div style="text-align: center; font-size: 24px; font-weight: bold; font-family: none;">
                <span style="color: #2988FF;">
                    ${options[0].productOptionName.name}
                </span>

                <span style="color: #000000;">
                    옵션 설명입니다.
                </span>
            </div>

            <p>
                &nbsp;
            </p>

            <p>
                &nbsp;
            </p>
        `;

        switch (twoWays) {
            case "N": {
                for (var i in options) {
                    var imageUrl: string = options[i].image ?? "";
            
                    //<div style="box-shadow: 0px 5px 10px lightgray; margin: 4%; padding: 8%;">
                    output += `
                        <div style="border: 1px solid lightgray; padding: 4%;">
                            <div style="color: #2988FF; font-size: 16px; font-weight: bold; font-family: none; text-align: center;">
                                ${indexType === 1 ? `${("00" + options[i].number).slice(-2)}. ${options[i].name}` : `${options[i].name}`}
                            </div>
    
                            <p>
                                &nbsp;
                            </p>
                            
                            ${options[i].image ? `<p style="text-align: center; width: 600px; margin: auto;"><img src="${getValidUploadImageUrl(imageUrl)}" alt="" width= "100%" /></p>` : "<p>&nbsp;</p>"}
                        </div>
    
                        <p>
                            &nbsp;
                        </p>
                    `;
                }

                break;
            }

            default: {
                var rpc = false;

                output += `<table style="border: 1px solid lightgray; border-collapse: collapse;">`;
        
                for (var i in options) {
                    if (!rpc) {
                        output += `<tr>`;
                    }
                    
                    var imageUrl: string = options[i].image ?? "";
        
                    //<div style="box-shadow: 0px 5px 10px lightgray; margin: 4%; padding: 8%;">
                    output += `
                        <td style="border: 1px solid lightgray; width: 50%; padding: 4%;">
                            <div>
                                <div style="color: #2988FF; font-size: 16px; font-weight: bold; font-family: none; text-align: center;">
                                    ${indexType === 1 ? `${("00" + options[i].number).slice(-2)}. ${options[i].name}` : `${options[i].name}`}
                                </div>
        
                                <p>
                                    &nbsp;
                                </p>
                                
                                ${options[i].image ? `<p style="text-align: center;"><img src="${getValidUploadImageUrl(imageUrl)}" alt="" width="100%" /></p>` : "<p>&nbsp;</p>"}
                            </div>
                        </td>
                    `;
        
                    if (rpc) {
                        output += `</tr>`;
                    }
        
                    rpc = !rpc;
                }
        
                if (options.length % 2 === 1) {
                    output += `
                        <td style="border: 1px solid lightgray; width: 50%; padding: 4%;">
                        </td>
                    `;
                }
        
                if (rpc) {
                    output += `</tr>`;
                }
        
                output += `</table>`;
                
                break;
            }
        }

        return output;
    }

    return "<p></p>";
}