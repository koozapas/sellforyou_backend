import { arg, booleanArg, extendType, intArg, list, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import { uploadToS3, uploadToS3AvoidDuplicate, uploadToS3WithEditor } from "../../utils/file_manage";

export const mutation_site_manage = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createNoticeByAdmin", {
            type: nonNull("Boolean"),
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                attachment: arg({ type: "Upload" }),

                
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    args.title = args.title.trim();

                    if (args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);

                    const notice = await ctx.prisma.notice.create({
                        data: {
                            content: args.content,
                            title: args.title,
                            attachmentFile: null,
                        }
                    })

                    const content = await uploadToS3WithEditor(args.content, ["notice", notice.id], null);
                    const attachmentFile = args.attachment ? (await uploadToS3(args.attachment, ["notice", notice.id])).url : null;

                    await ctx.prisma.notice.update({
                        where: { id: notice.id },
                        data: {
                            content,
                            attachmentFile,
                        }
                    });
                

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateNoticeByAdmin", {
            type: nonNull("Boolean"),
            args: {
                noticeId: nonNull(intArg()),
                title: stringArg(),
                content: stringArg(),
                attachment: arg({ type: "Upload" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const notice = await ctx.prisma.notice.findUnique({ where: { id: args.noticeId } });

                    if (!notice) {
                        return throwError(errors.etc("잘못된 공지사항 ID입니다."), ctx);
                    }

                    args.title = args.title ? args.title.trim() : undefined;

                    if (args.title && args.title.length === 0) {
                        return throwError(errors.etc("제목을 입력하세요."), ctx);
                    }

                    if (args.title && args.title.length > 200) {
                        return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);
                    }

                    let attachmentFile: string | undefined = undefined;

                    if (args.attachment) {
                        attachmentFile = (await uploadToS3(args.attachment, ["notice", notice.id])).url;
                    }

                    const content = args.content ? await uploadToS3WithEditor(args.content, ["notice", notice.id], null) : undefined;

                    const users = await ctx.prisma.user.findMany();

                    const orgNotice = await ctx.prisma.notice.findUnique({
                        where: { id: notice.id },
                    });

                    await ctx.prisma.userLog.updateMany({
                        where: {
                            userId: {
                                in: users.map((v) => { 
                                    return v.id 
                                })
                            },

                            title: orgNotice?.title
                        },
                        
                        data: {
                            title: args.title,
                            payloadData: JSON.stringify(args.content),
                        }
                    });

                    await ctx.prisma.notice.update({
                        where: { id: notice.id },

                        data: {
                            title: args.title,
                            content,
                            attachmentFile,
                        }
                    });

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("deleteNoticeByAdmin", {
            type: nonNull("Int"),
            args: {
                noticeIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const users = await ctx.prisma.user.findMany();

                    const orgNotices = await ctx.prisma.notice.findMany({
                        where: { id: { in: args.noticeIds } },
                    });

                    await ctx.prisma.userLog.deleteMany({
                        where: {
                            userId: {
                                in: users.map((v) => { 
                                    return v.id 
                                })
                            },

                            title: {
                                in: orgNotices.map((v) => {
                                    return v.title
                                })
                            }
                        }
                    });

                    const notice = await ctx.prisma.notice.deleteMany({ 
                        where: { 
                            id: { 
                                in: args.noticeIds 
                            } 
                        } 
                    });

                    return notice.count;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        
        t.field("createUserQuestionByUser", {
            type: nonNull("Boolean"),
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                attachment: list(nonNull(arg({ type: "Upload" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    args.title = args.title.trim();

                    if (args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);
                    if (args.attachment && args.attachment.length > 5) return throwError(errors.etc("첨부파일은 5개 이하만 업로드 가능합니다."), ctx);

                    const userQuestion = await ctx.prisma.userQuestion.create({
                        data: {
                            userId: ctx.token!.userId!,
                            content: args.content,
                            title: args.title,
                            attachmentFile: null,
                        }
                    })

                    /// content 내 이미지를 s3 업로드된 이미지 경로로 치환
                    const content = await uploadToS3WithEditor(args.content, ["user_question", userQuestion.id], null);

                    /// 기타 첨부파일 S3에 업로드 후 경로 반환
                    const attachmentFile: string[] = [];
                    if (args.attachment) {
                        for (let element of args.attachment) {
                            attachmentFile.push(await uploadToS3AvoidDuplicate(element, ["user_question", userQuestion.id]));
                        }
                    }
                    // const attachmentFile = args.attachment ?
                    //     (await uploadToS3(args.attachment, ["userQuestion", userQuestion.id])).url : null;

                    await ctx.prisma.userQuestion.update({
                        where: { id: userQuestion.id },
                        data: {
                            content,
                            attachmentFile: JSON.stringify(attachmentFile),
                        }
                    })
                    return true;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });

        t.field("updateUserQuestionByAdmin", {
            type: nonNull("Boolean"),
            args: {
                userQuestionId: nonNull(intArg()),
                answer: nonNull(stringArg())
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const userQuestion = await ctx.prisma.userQuestion.findUnique({ where: { id: args.userQuestionId } });

                    if (!userQuestion) {
                        return throwError(errors.etc("잘못된 1대1 문의 ID입니다."), ctx);
                    }

                    const content = args.answer ? await uploadToS3WithEditor(args.answer, ["userQuestion", userQuestion.id], null) : undefined;

                    if (!content) {
                        return throwError(errors.etc("답변 내용이 없습니다."), ctx);
                    }

                    await ctx.prisma.userQuestion.update({
                        where: {
                            id: userQuestion.id
                        },
                        data: {
                            answer: content,
                            answeredAt: new Date(),
                        }
                    })
                    return true;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});