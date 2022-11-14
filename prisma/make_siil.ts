import * as util from 'util'
import { siilInfo, SiilOutputData } from '../api/graphql';

export interface Root {
    infoCode: string
    infoName: string
    data: Daum[]
}

export interface Daum {
    label: Label[]
    textBox?: TextBox[]
    radioButton?: RadioButton[]
    _text: string
    comboBox?: ComboBox
}

export interface Label {
    _text: string
}

export interface TextBox {
    _tag: string
}

export interface RadioButton {
    _text: string
    _tag: string
    _groupName?: string
    _checked?: string
}

export interface ComboBox {
    _tag: string
}


const dataaa: Root[] = [
    {
        "infoCode": "01",
        "infoName": "의류",
        "data": [
            {
                "label": [
                    {
                        "_text": "제품 소재"
                    },
                    {
                        "_text": "기능성 여부"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0101_0"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "대상상품",
                        "_groupName": "0101_1",
                        "_tag": "0101_1"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_groupName": "0101_1",
                        "_tag": "0101_1"
                    }
                ],
                "_text": "제품 소재 (섬유의 조성 또는 혼용률을 백분율로 표시, 기능성인 경우 성적서 또는 허가서) 예시) 폴리에스터-75%"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0102"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "치수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0103"
                    }
                ],
                "_text": "치수"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0104_0"
                    },
                    {
                        "_tag": "0104_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_groupName": "0104_1",
                        "_tag": "0104_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_groupName": "0104_1",
                        "_tag": "0104_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0105"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "세탁방법"
                    },
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0106_0"
                    },
                    {
                        "_tag": "0106_1"
                    }
                ],
                "_text": "세탁방법 및 취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "제조연월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0107"
                    }
                ],
                "_text": "제조연월 예)2012-10"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0108"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0109"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "02",
        "infoName": "구두/신발",
        "data": [
            {
                "label": [
                    {
                        "_text": "제품의 주소재"
                    },
                    {
                        "_text": "운동화 여부"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0201_0"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_groupName": "0201_1",
                        "_tag": "0201_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_groupName": "0201_1",
                        "_tag": "0201_1"
                    }
                ],
                "_text": "제품의 주소재 (운동화인 경우에는 겉감, 안감을 구분하여 표시)"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0202"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "발길이"
                    },
                    {
                        "_text": "굽높이"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0203_0"
                    },
                    {
                        "_tag": "0203_1"
                    }
                ],
                "_text": "치수( 발길이: 해외사이즈 표기시 국내사이즈 병행 표기(mm), 굽높이:굽 재료를 사용하는 여성화에 한함(cm) )"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0204_0"
                    },
                    {
                        "_tag": "0204_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_groupName": "0204_1",
                        "_tag": "0204_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_groupName": "0204_1",
                        "_tag": "0204_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0205"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0206"
                    }
                ],
                "_text": "취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0207"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0208"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "03",
        "infoName": "가방",
        "data": [
            {
                "label": [
                    {
                        "_text": "종류"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0301"
                    }
                ],
                "_text": "종류"
            },
            {
                "label": [
                    {
                        "_text": "소재"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0302"
                    }
                ],
                "_text": "소재"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0303"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0304"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0305_0"
                    },
                    {
                        "_tag": "0305_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0305_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0305_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0306"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0307"
                    }
                ],
                "_text": "취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0308"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0309"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "04",
        "infoName": "패션잡화(모자/벨트/액세서리)",
        "data": [
            {
                "label": [
                    {
                        "_text": "종류"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0401"
                    }
                ],
                "_text": "종류"
            },
            {
                "label": [
                    {
                        "_text": "소재"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0402"
                    }
                ],
                "_text": "소재"
            },
            {
                "label": [
                    {
                        "_text": "치수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0403"
                    }
                ],
                "_text": "치수"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입자",
                    },
                    {
                        "_text": "수입품 여부"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0404_0"
                    },
                    {
                        "_tag": "0404_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0404_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0404_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0405"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0406"
                    }
                ],
                "_text": "취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0407"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0408"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "05",
        "infoName": "침구류/커튼",
        "data": [
            {
                "label": [
                    {
                        "_text": "제품 소재"
                    },
                    {
                        "_text": "충전재 여부"
                    },
                    {
                        "_text": "충전재"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0501_0"
                    },
                    {
                        "_tag": "0501_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0501_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0501_1"
                    }
                ],
                "_text": "제품 소재 (섬유의 조성 또는 혼용률을 백분율로 표시, 기능성인 경우 성적서 또는 허가서) 예시) 폴리에스터-75%"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0502"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "치수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0503"
                    }
                ],
                "_text": "치수"
            },
            {
                "label": [
                    {
                        "_text": "제품구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0504"
                    }
                ],
                "_text": "제품구성"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0505_0"
                    },
                    {
                        "_tag": "0505_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0505_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0505_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0506"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "세탁방법"
                    },
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0507_0"
                    },
                    {
                        "_tag": "0507_1"
                    }
                ],
                "_text": "세탁방법 및 취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0508"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0509"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "06",
        "infoName": "가구(침대/소파/싱크대/DIY제품)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0601"
                    }
                ],
                "_text": "품명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "0602_0"
                },
                "textBox": [
                    {
                        "_tag": "0602_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (품질경영 및 공산품안전관리법 상 안전·품질표시대상공산품에 한함) "
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0603"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "구성품"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0604"
                    }
                ],
                "_text": "구성품"
            },
            {
                "label": [
                    {
                        "_text": "주요 소재"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0605"
                    }
                ],
                "_text": "주요 소재"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "복수 구성품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0606_0"
                    },
                    {
                        "_tag": "0606_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0606_1",
                        "_groupName": "a"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0606_1",
                        "_groupName": "a"
                    },
                    {
                        "_text": "Y",
                        "_tag": "0606_2",
                        "_groupName": "b"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0606_2",
                        "_groupName": "b"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)\n* 구성품별 제조자가 다른경우 각 구성품의 제조자, 수입자 입력"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0607"
                    }
                ],
                "_text": "제조국 (구성품별 제조자가 다른경우 각 구성품의 제조국)"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0608"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "배송/설치비용"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0609"
                    }
                ],
                "_text": "배송/설치비용"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0610"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0611"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "07",
        "infoName": "영상가전(TV류)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0701_0"
                    },
                    {
                        "_tag": "0701_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "0702_0"
                },
                "textBox": [
                    {
                        "_tag": "0702_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전기용품안전관리법 상 안전인증대상전기용품, 안전확인대상전기용품, 공급자적합성확인대상전기용품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    },
                    {
                        "_text": "에너지소비효율등급여부"
                    },
                    {
                        "_text": "에너지소비효율등급"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0703_0"
                    },
                    {
                        "_tag": "0703_1"
                    },
                    {
                        "_tag": "0703_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0703_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0703_2"
                    }
                ],
                "_text": "정격전압, 소비전력, 에너지소비효율등급 (에너지이용합리화법 상 의무대상상품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0704"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0705_0"
                    },
                    {
                        "_tag": "0705_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0705_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0705_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0706"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0707"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "화면사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0708"
                    }
                ],
                "_text": "화면사양 (크기, 해상도, 화면비율 등)"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0709"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0710"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "08",
        "infoName": "가정용 전기제품 (냉장고/세탁기/식기세척기/전자레인지)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0801_0"
                    },
                    {
                        "_tag": "0801_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "0802_0"
                },
                "textBox": [
                    {
                        "_tag": "0802_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전기용품안전관리법 상 안전인증대상전기용품, 안전확인대상전기용품, 공급자적합성확인대상전기용품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    },
                    {
                        "_text": "에너지소비효율등급여부"
                    },
                    {
                        "_text": "에너지소비효율등급"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0803_0"
                    },
                    {
                        "_tag": "0803_1"
                    },
                    {
                        "_tag": "0803_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0803_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0803_2"
                    }
                ],
                "_text": "정격전압, 소비전력, 에너지소비효율등급 (에너지이용합리화법 상 의무대상상품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0804"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0805_0"
                    },
                    {
                        "_tag": "0805_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0805_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0805_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0806"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "용량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0807_0"
                    },
                    {
                        "_tag": "0807_1"
                    }
                ],
                "_text": "크기 (용량, 형태 포함)"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0808"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0809"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "09",
        "infoName": "계절가전(에어컨/온풍기)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0901_0"
                    },
                    {
                        "_tag": "0901_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "0902_0"
                },
                "textBox": [
                    {
                        "_tag": "0902_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전기용품안전관리법 상 안전인증대상전기용품, 안전확인대상전기용품, 공급자적합성확인대상전기용품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    },
                    {
                        "_text": "에너지소비효율등급여부"
                    },
                    {
                        "_text": "에너지소비효율등급"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0903_0"
                    },
                    {
                        "_tag": "0903_1"
                    },
                    {
                        "_tag": "0903_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0903_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0903_2"
                    }
                ],
                "_text": "정격전압, 소비전력, 에너지소비효율등급 (에너지이용합리화법 상 의무대상상품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0904"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0905_0"
                    },
                    {
                        "_tag": "0905_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "0905_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "0905_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0906"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0907"
                    }
                ],
                "_text": "크기 (형태 및 실외기 포함)"
            },
            {
                "label": [
                    {
                        "_text": "냉난방면적(㎡)"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0908"
                    }
                ],
                "_text": "냉난방면적(㎡)"
            },
            {
                "label": [
                    {
                        "_text": "추가설치비용"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0909"
                    }
                ],
                "_text": "추가설치비용"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0910"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "0911"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "10",
        "infoName": "사무용기기(컴퓨터/노트북/프린터)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1001_0"
                    },
                    {
                        "_tag": "1001_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1002_0"
                },
                "textBox": [
                    {
                        "_tag": "1002_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전파법 상 인증대상상품에 한함, MIC 인증 필 혼용 가능)"
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    },
                    {
                        "_text": "에너지소비효율등급여부"
                    },
                    {
                        "_text": "에너지소비효율등급"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1003_0"
                    },
                    {
                        "_tag": "1003_1"
                    },
                    {
                        "_tag": "1003_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1003_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1003_2"
                    }
                ],
                "_text": "정격전압, 소비전력, 에너지소비효율등급 (에너지이용합리화법 상 의무대상상품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1004"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1005_0"
                    },
                    {
                        "_tag": "1005_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1005_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1005_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1006"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "노트북 여부"
                    },
                    {
                        "_text": "무게"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1007_0"
                    },
                    {
                        "_tag": "1007_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1007_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1007_1"
                    }
                ],
                "_text": "크기, 무게 (무게는 노트북에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1008"
                    }
                ],
                "_text": "주요 사양 (컴퓨터와 노트북의 경우 성능, 용량, 운영체제 포함여부 등 / 프린터의 경우 인쇄 속도 등)"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1009"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1010"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "11",
        "infoName": "광학기기(디지털카메라/캠코더)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1101_0"
                    },
                    {
                        "_tag": "1101_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1102_0"
                },
                "textBox": [
                    {
                        "_tag": "1102_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전파법 상 인증대상상품에 한함, MIC 인증 필 혼용 가능) "
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1103"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1104_0"
                    },
                    {
                        "_tag": "1104_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1104_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1104_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1105"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "무게"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1106_0"
                    },
                    {
                        "_tag": "1106_1"
                    }
                ],
                "_text": "크기, 무게"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1107"
                    }
                ],
                "_text": "주요 사양"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1108"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1109"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "12",
        "infoName": "소형가전(MP3/전자사전 등)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1201_0"
                    },
                    {
                        "_tag": "1201_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1202_0"
                },
                "textBox": [
                    {
                        "_tag": "1202_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전파법 상 인증대상상품에 한함, MIC 인증 필 혼용 가능) "
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1203_0"
                    },
                    {
                        "_tag": "1203_1"
                    }
                ],
                "_text": "정격전압, 소비전력"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1204"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1205_0"
                    },
                    {
                        "_tag": "1205_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1205_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1205_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1206"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "무게"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1207_0"
                    },
                    {
                        "_tag": "1207_1"
                    }
                ],
                "_text": "크기, 무게"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1208"
                    }
                ],
                "_text": "주요 사양"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1209"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1210"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "13",
        "infoName": "휴대폰",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1301_0"
                    },
                    {
                        "_tag": "1301_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1302_0"
                },
                "textBox": [
                    {
                        "_tag": "1302_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전파법 상 인증대상상품에 한함, MIC 인증 필 혼용 가능) "
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1303"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1304_0"
                    },
                    {
                        "_tag": "1304_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1304_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1304_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1305"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "무게"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1306_0"
                    },
                    {
                        "_tag": "1306_1"
                    }
                ],
                "_text": "크기, 무게"
            },
            {
                "label": [
                    {
                        "_text": "이동통신사"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1307"
                    }
                ],
                "_text": "이동통신사"
            },
            {
                "label": [
                    {
                        "_text": "가입절차"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1308"
                    }
                ],
                "_text": "가입절차"
            },
            {
                "label": [
                    {
                        "_text": "부담사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1309"
                    }
                ],
                "_text": "소비자의 추가적인 부담사항 (가입비, 유심카드 구입비 등 추가로 부담하여야 할 금액, 부가서비스, 의무사용기간, 위약금 등)"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1310"
                    }
                ],
                "_text": "주요 사양"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1311"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1312"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "14",
        "infoName": "내비게이션",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1401_0"
                    },
                    {
                        "_tag": "1401_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1402_0"
                },
                "textBox": [
                    {
                        "_tag": "1402_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (전파법 상 인증대상상품에 한함, MIC 인증 필 혼용 가능) "
            },
            {
                "label": [
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1403_0"
                    },
                    {
                        "_tag": "1403_1"
                    }
                ],
                "_text": "정격전압, 소비전력"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1404"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1405_0"
                    },
                    {
                        "_tag": "1405_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1405_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1405_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1406"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "무게"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1407_0"
                    },
                    {
                        "_tag": "1407_1"
                    }
                ],
                "_text": "크기, 무게"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1408"
                    }
                ],
                "_text": "주요 사양"
            },
            {
                "label": [
                    {
                        "_text": "맵 업데이트 비용"
                    },
                    {
                        "_text": "무상기간"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1409_0"
                    },
                    {
                        "_tag": "1409_1"
                    }
                ],
                "_text": "맵 업데이트 비용 및 무상기간"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1410"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1411"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "15",
        "infoName": "자동차용품(자동차부품/기타 자동차용품)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1501_0"
                    },
                    {
                        "_tag": "1501_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1502"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1503_0"
                },
                "textBox": [
                    {
                        "_tag": "1503_1"
                    }
                ],
                "_text": "KC 인증 필 유무 (인증 대상 자동차부품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1504_0"
                    },
                    {
                        "_tag": "1504_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1504_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1504_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1505"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1506"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "적용차종"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1507"
                    }
                ],
                "_text": "적용차종"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1508"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1509"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "제품사용으로 인한\r\n위험 및 유의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1510"
                    }
                ],
                "_text": "제품사용으로 인한 위험 및 유의사항 (연료절감장치에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "검사합격증 번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1511"
                    }
                ],
                "_text": "검사합격증 번호(대기환경보전법에 따른 첨가제·촉매제에 한함)"
            }
        ]
    },
    {
        "infoCode": "16",
        "infoName": "의료기기",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1601_0"
                    },
                    {
                        "_tag": "1601_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "의료기기여부"
                    },
                    {
                        "_text": "허가번호"
                    },
                    {
                        "_text": "광고사전심의필"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1602_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1602_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "유",
                        "_tag": "1602_2",
                        "_groupName": "b"
                    },
                    {
                        "_text": "무",
                        "_checked": "True",
                        "_tag": "1602_2",
                        "_groupName": "b"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1602_1"
                    }
                ],
                "_text": "의료기기법상 허가·신고 번호(허가·신고 대상 의료기기에 한함) 및 광고사전심의필 유무"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "1603_0"
                },
                "textBox": [
                    {
                        "_tag": "1603_1"
                    }
                ],
                "_text": "전기용품안전관리법상 KC 인증 필 유무 (안전인증 또는 자율안전확인 대상 전기용품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "전기용품여부"
                    },
                    {
                        "_text": "정격전압"
                    },
                    {
                        "_text": "소비전력"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1604_0"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1604_0"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1604_1"
                    },
                    {
                        "_tag": "1604_2"
                    }
                ],
                "_text": "정격전압, 소비전력 (전기용품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1605"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1606_0"
                    },
                    {
                        "_tag": "1606_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1606_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1606_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1607"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "사용목적"
                    },
                    {
                        "_text": "사용방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1608_0"
                    },
                    {
                        "_tag": "1608_1"
                    }
                ],
                "_text": "제품의 사용목적 및 사용방법"
            },
            {
                "label": [
                    {
                        "_text": "취급시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1609"
                    }
                ],
                "_text": "취급시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1610"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1611"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "17",
        "infoName": "주방용품",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1701_0"
                    },
                    {
                        "_tag": "1701_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "재질"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1702"
                    }
                ],
                "_text": "재질"
            },
            {
                "label": [
                    {
                        "_text": "구성품"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1703"
                    }
                ],
                "_text": "구성품"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1704"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1705"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1706_0"
                    },
                    {
                        "_tag": "1706_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1706_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1706_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1707"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "수입식품안전관리특별법에 따른 수입신고를 필함",
                        "_tag": "1708"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "1708"
                    }
                ],
                "_text": "「수입식품안전관리특별법」에 따른 수입 기구·용기의 경우 “「수입식품안전관리특별법」에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1709"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1710"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "18",
        "infoName": "화장품",
        "data": [
            {
                "label": [
                    {
                        "_text": "용량 또는 중량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1801"
                    }
                ],
                "_text": "용량 또는 중량"
            },
            {
                "label": [
                    {
                        "_text": "주요 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1802"
                    }
                ],
                "_text": "제품 주요 사양 (피부타입, 색상(호, 번) 등)"
            },
            {
                "label": [
                    {
                        "_text": "사용기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1803"
                    }
                ],
                "_text": "사용기한 또는 개봉 후 사용기간(개봉 후 사용기간을 기재할 경우에는 제조연월일을 병행표기)"
            },
            {
                "label": [
                    {
                        "_text": "사용방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1804"
                    }
                ],
                "_text": "사용방법"
            },
            {
                "label": [
                    {
                        "_text": "제조업자"
                    },
                    {
                        "_text": "책임판매업자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1805_0"
                    },
                    {
                        "_tag": "1805_1"
                    }
                ],
                "_text": "화장품제조업자 및 화장품책임판매업자"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1806"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "모든성분"
                    },
                    {
                        "_text": "유기농화장품여부"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1807_0"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1807_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1807_1"
                    }
                ],
                "_text": "화장품법에 따라 기재, 표시하여야 하는 모든 성분"
            },
            {
                "label": [
                    {
                        "_text": "기능성"
                    },
                    {
                        "_text": "기능성내용"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "식품의약품안전처 심사 필",
                        "_tag": "1808_0"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "1808_0"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1808_1"
                    }
                ],
                "_text": "기능성 화장품의 경우 화장품법에 따른 식품의약품안전처 심사 필 유무 (미백, 주름개선, 자외선차단 등)"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1809"
                    }
                ],
                "_text": "사용할 때 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1810"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1811"
                    }
                ],
                "_text": "소비자상담관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "19",
        "infoName": "귀금속/보석/시계류",
        "data": [
            {
                "label": [
                    {
                        "_text": "소재"
                    },
                    {
                        "_text": "순도"
                    },
                    {
                        "_text": "밴드재질"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1901_0"
                    },
                    {
                        "_tag": "1901_1"
                    },
                    {
                        "_tag": "1901_2"
                    }
                ],
                "_text": "소재 / 순도 / 밴드재질 (시계의 경우)"
            },
            {
                "label": [
                    {
                        "_text": "중량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1902"
                    }
                ],
                "_text": "중량"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1903_0"
                    },
                    {
                        "_tag": "1903_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "1903_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "1903_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1904"
                    }
                ],
                "_text": "제조국 (원산지와 가공지 등이 다를 경우 함께 표기)"
            },
            {
                "label": [
                    {
                        "_text": "치수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1905"
                    }
                ],
                "_text": "치수"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1906"
                    }
                ],
                "_text": "착용 시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "귀금속,보석류-등급"
                    },
                    {
                        "_text": "시계 - 기능,방수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1907_0"
                    },
                    {
                        "_tag": "1907_1"
                    }
                ],
                "_text": "주요사항( (귀금속, 보석류 - 등급),(시계 - 기능,방수)등 )"
            },
            {
                "label": [
                    {
                        "_text": "보증서"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "보증서 제공유",
                        "_tag": "1908"
                    },
                    {
                        "_text": "보증서 제공무",
                        "_checked": "True",
                        "_tag": "1908"
                    }
                ],
                "_text": "보증서 제공유무"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1909"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "1910"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "20A",
        "infoName": "식품(농산물)",
        "data": [
            {
                "label": [
                    {
                        "_text": "용량(중량)"
                    },
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "수량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A01_0"
                    },
                    {
                        "_tag": "20A01_1"
                    },
                    {
                        "_tag": "20A01_2"
                    }
                ],
                "_text": "포장단위별 내용물의 용량(중량), 수량, 크기"
            },
            {
                "label": [
                    {
                        "_text": "생산자"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A02_0"
                    },
                    {
                        "_tag": "20A02_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "20A02_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "20A02_1"
                    }
                ],
                "_text": "생산자, 수입품의 경우 수입자를 함께 표기"
            },
            {
                "label": [
                    {
                        "_text": "원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A03"
                    }
                ],
                "_text": "농수산물의 원산지 표시에 관한 법률에 따른 원산지"
            },
            {
                "label": [
                    {
                        "_text": "제조연월일"
                    },
                    {
                        "_text": "   유통기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A04_0"
                    },
                    {
                        "_tag": "20A04_1"
                    }
                ],
                "_text": "제조연월일(포장일 또는 생산연도) , 유통기한"
            },
            {
                "label": [
                    {
                        "_text": "유전자변형농산물"
                    },
                    {
                        "_text": "지리적표시"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "대상상품",
                        "_tag": "20A05_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20A05_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "대상상품",
                        "_tag": "20A05_1",
                        "_groupName": "b"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20A05_1",
                        "_groupName": "b"
                    }
                ],
                "_text": "농산물 - 농수산물품질관리법상 유전자변형농산물 표시, 지리적표시"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "식품위생법에 따른 수입신고를 필함",
                        "_tag": "20A08"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20A08"
                    }
                ],
                "_text": "수입식품에 해당하는 경우 “식품위생법에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "상품구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A09"
                    }
                ],
                "_text": "상품구성"
            },
            {
                "label": [
                    {
                        "_text": "보관/취급방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A10"
                    }
                ],
                "_text": "보관방법 또는 취급방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A11"
                    }
                ],
                "_text": "소비자상담관련 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "품목 또는 명칭"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A12"
                    }
                ],
                "_text": "품목 또는 명칭"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20A13"
                    }
                ],
                "_text": "「식품 등의 표시·광고에 관한 법률」에 따른 소비자안전을 위한 주의사항"
            }
        ]
    },
    {
        "infoCode": "20B",
        "infoName": "식품(축산물)",
        "data": [
            {
                "label": [
                    {
                        "_text": "용량(중량)"
                    },
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "수량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B01_0"
                    },
                    {
                        "_tag": "20B01_1"
                    },
                    {
                        "_tag": "20B01_2"
                    }
                ],
                "_text": "포장단위별 내용물의 용량(중량), 수량, 크기"
            },
            {
                "label": [
                    {
                        "_text": "생산자"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B02_0"
                    },
                    {
                        "_tag": "20B02_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "20B02_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "20B02_1"
                    }
                ],
                "_text": "생산자, 수입품의 경우 수입자를 함께 표기"
            },
            {
                "label": [
                    {
                        "_text": "원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B03"
                    }
                ],
                "_text": "농수산물의 원산지 표시에 관한 법률에 따른 원산지"
            },
            {
                "label": [
                    {
                        "_text": "제조연월일"
                    },
                    {
                        "_text": "유통기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B04_0"
                    },
                    {
                        "_tag": "20B04_1"
                    }
                ],
                "_text": "제조연월일(포장일 또는 생산연도) , 유통기한"
            },
            {
                "label": [
                    {
                        "_text": "축산법에 등급표시"
                    },
                    {
                        "_text": "「축산물이력법」에 따른 이력관리대상축산물 유무"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B06_0"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "유",
                        "_tag": "20B06_1"
                    },
                    {
                        "_text": "무",
                        "_checked": "True",
                        "_tag": "20B06_1"
                    }
                ],
                "_text": "축산물 - 축산법에 따른 등급 표시, 「축산물이력법」에 따른 이력관리대상축산물 유무"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "수입식품안전관리특별법에 따른 수입신고를 필함",
                        "_tag": "20B08"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20B08"
                    }
                ],
                "_text": "수입식품에 해당하는 경우 “「수입식품안전관리특별법」에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "상품구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B09"
                    }
                ],
                "_text": "상품구성"
            },
            {
                "label": [
                    {
                        "_text": "보관/취급방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B10"
                    }
                ],
                "_text": "보관방법 또는 취급방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B11"
                    }
                ],
                "_text": "소비자상담관련 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "품목 또는 명칭"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B12"
                    }
                ],
                "_text": "품목 또는 명칭"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20B13"
                    }
                ],
                "_text": "「식품 등의 표시·광고에 관한 법률」에 따른 소비자안전을 위한 주의사항"
            }
        ]
    },
    {
        "infoCode": "20C",
        "infoName": "식품(수산물)",
        "data": [
            {
                "label": [
                    {
                        "_text": "용량(중량)"
                    },
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "수량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C01_0"
                    },
                    {
                        "_tag": "20C01_1"
                    },
                    {
                        "_tag": "20C01_2"
                    }
                ],
                "_text": "포장단위별 내용물의 용량(중량), 수량, 크기"
            },
            {
                "label": [
                    {
                        "_text": "생산자"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C02_0"
                    },
                    {
                        "_tag": "20C02_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "20C02_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "20C02_1"
                    }
                ],
                "_text": "생산자, 수입품의 경우 수입자를 함께 표기"
            },
            {
                "label": [
                    {
                        "_text": "원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C03"
                    }
                ],
                "_text": "농수산물의 원산지 표시에 관한 법률에 따른 원산지"
            },
            {
                "label": [
                    {
                        "_text": "제조연월일"
                    },
                    {
                        "_text": "유통기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C04_0"
                    },
                    {
                        "_tag": "20C04_1"
                    }
                ],
                "_text": "제조연월일(포장일 또는 생산연도), 유통기한"
            },
            {
                "label": [
                    {
                        "_text": "유전자변형수산물"
                    },
                    {
                        "_text": "지리적표시"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "대상상품",
                        "_tag": "20C07_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20C07_0",
                        "_groupName": "a"
                    },
                    {
                        "_text": "대상상품",
                        "_tag": "20C07_1",
                        "_groupName": "b"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20C07_1",
                        "_groupName": "b"
                    }
                ],
                "_text": "수산물 - 농수산물품질관리법상 유전자변형수산물 표시, 지리적표시"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "수입식품안전관리특별법에 따른 수입신고를 필함",
                        "_tag": "20C08"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "20C08"
                    }
                ],
                "_text": "수입식품에 해당하는 경우 “「수입식품안전관리특별법」에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "상품구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C09"
                    }
                ],
                "_text": "상품구성"
            },
            {
                "label": [
                    {
                        "_text": "보관/취급방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C10"
                    }
                ],
                "_text": "보관방법 또는 취급방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C11"
                    }
                ],
                "_text": "소비자상담관련 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "품목 또는 명칭"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C12"
                    }
                ],
                "_text": "품목 또는 명칭"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "20C13"
                    }
                ],
                "_text": "「식품 등의 표시·광고에 관한 법률」에 따른 소비자안전을 위한 주의사항"
            }
        ]
    },
    {
        "infoCode": "21",
        "infoName": "가공식품",
        "data": [
            {
                "label": [
                    {
                        "_text": "식품의 유형"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2101"
                    }
                ],
                "_text": "식품의 유형"
            },
            {
                "label": [
                    {
                        "_text": "생산자"
                    },
                    {
                        "_text": "소재지"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자 및 제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2102_0"
                    },
                    {
                        "_tag": "2102_1"
                    },
                    {
                        "_tag": "2102_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2102_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2102_2"
                    }
                ],
                "_text": "생산자 및 소재지, 수입품의 경우 생산자, 수입자 및 제조국"
            },
            {
                "label": [
                    {
                        "_text": "제조연월일"
                    },
                    {
                        "_text": "유통기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2103_0"
                    },
                    {
                        "_tag": "2103_1"
                    }
                ],
                "_text": "제조연월일, 유통기한"
            },
            {
                "label": [
                    {
                        "_text": "포장단위별 용량(중량)"
                    },
                    {
                        "_text": "포장단위별 수량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2104_0"
                    },
                    {
                        "_tag": "2104_1"
                    }
                ],
                "_text": "포장단위별 내용물의 용량(중량), 수량"
            },
            {
                "label": [
                    {
                        "_text": "원재료명"
                    },
                    {
                        "_text": "함량"
                    },
                    {
                        "_text": "원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2105_0"
                    },
                    {
                        "_tag": "2105_1"
                    },
                    {
                        "_tag": "2105_2"
                    }
                ],
                "_text": "원재료명 및 함량(농수산물의 원산지 표시에 관한 법률에 따른 원산지 표시 포함)"
            },
            {
                "label": [
                    {
                        "_text": "영양성분"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2106"
                    }
                ],
                "_text": "영양성분(「식품 등의 표시·광고에 관한 법률」에 따른 영양성분 표시대상 식품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "유전자변형식품여부"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "유전자변형식품임",
                        "_tag": "2107"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2107"
                    }
                ],
                "_text": "유전자변형식품에 해당하는 경우의 표시"
            },
            {
                "label": [
                    {
                        "_text": "사전심의필여부"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "사전심의필",
                        "_tag": "2108"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2108"
                    }
                ],
                "_text": "영유아식 또는 체중조절식품 등에 해당하는 경우 표시광고 사전심의필여부 [* 전자상거래법 개정으로 인하여 삭제 예정]"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "수입식품안전관리특별법에 따른 수입신고를 필함",
                        "_tag": "2109"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2109"
                    }
                ],
                "_text": "수입식품에 해당하는 경우 “「수입식품안전관리특별법」에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2110"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "가능성 여부"
                    },
                    {
                        "_text": "부작용 발생 가능성"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2111_0"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2111_0"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2111_1"
                    }
                ],
                "_text": "부작용 발생 가능성 (Y or N)"
            },
            {
                "label": [
                    {
                        "_text": "제품명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2112"
                    }
                ],
                "_text": "제품명"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2113"
                    }
                ],
                "_text": "소비자안전을 위한 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "표시사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2114"
                    }
                ],
                "_text": "「식품 등의 표시·광고에 관한 법률」에 따른 표시사항"
            }
        ]
    },
    {
        "infoCode": "22",
        "infoName": "건강기능식품",
        "data": [
            {
                "label": [
                    {
                        "_text": "식품의 유형"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2201"
                    }
                ],
                "_text": "식품의 유형"
            },
            {
                "label": [
                    {
                        "_text": "생산자"
                    },
                    {
                        "_text": "소재지"
                    },
                    {
                        "_text": "수입품여부"
                    },
                    {
                        "_text": "수입자 및 제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2202_0"
                    },
                    {
                        "_tag": "2202_1"
                    },
                    {
                        "_tag": "2202_3"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2202_2"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2202_2"
                    }
                ],
                "_text": "생산자 및 소재지, 수입품의 경우 생산자, 수입자 및 제조국"
            },
            {
                "label": [
                    {
                        "_text": "제조연월일"
                    },
                    {
                        "_text": "  유통기한 및\r\n품질유지기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2203_0"
                    },
                    {
                        "_tag": "2203_1"
                    }
                ],
                "_text": "제조연월일(포장일 또는 생산연도) , 유통기한 또는 품질유지기한"
            },
            {
                "label": [
                    {
                        "_text": "포장단위별 용량(중량)"
                    },
                    {
                        "_text": "포장단위별 수량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2204_0"
                    },
                    {
                        "_tag": "2204_1"
                    }
                ],
                "_text": "포장단위별 내용물의 용량(중량), 수량"
            },
            {
                "label": [
                    {
                        "_text": "원재료명"
                    },
                    {
                        "_text": "함량"
                    },
                    {
                        "_text": "원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2205_0"
                    },
                    {
                        "_tag": "2205_1"
                    },
                    {
                        "_tag": "2205_2"
                    }
                ],
                "_text": "원재료명 및 함량(농수산물의 원산지 표시에 관한 법률에 따른 원산지 표시 포함)"
            },
            {
                "label": [
                    {
                        "_text": "영양성분"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2206"
                    }
                ],
                "_text": "영양성분"
            },
            {
                "label": [
                    {
                        "_text": "기능정보"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2207"
                    }
                ],
                "_text": "기능정보"
            },
            {
                "label": [
                    {
                        "_text": "섭취량,섭취방법\r\n섭취 시 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2208"
                    }
                ],
                "_text": "섭취량, 섭취방법 및 섭취 시 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "내용 표기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2209"
                    }
                ],
                "_text": "질병의 예방 및 치료를 위한 의약품이 아니라는 내용의 표현"
            },
            {
                "label": [
                    {
                        "_text": "유전자"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "유전자변형건강기능식품임",
                        "_tag": "2210"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2210"
                    }
                ],
                "_text": "유전자변형건강기능식품여부"
            },
            {
                "label": [
                    {
                        "_text": "표시광고"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "사전심의필",
                        "_tag": "2211"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2211"
                    }
                ],
                "_text": "표시광고 사전심의필"
            },
            {
                "label": [
                    {
                        "_text": "수입품"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "수입식품안전관리특별법에 따른 수입신고를 필함",
                        "_tag": "2212"
                    },
                    {
                        "_text": "대상아님",
                        "_checked": "True",
                        "_tag": "2212"
                    }
                ],
                "_text": "수입식품에 해당하는 경우 “「수입식품안전관리특별법」에 따른 수입신고를 필함”의 문구"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2213"
                    }
                ],
                "_text": "소비자상담관련 전화번호"
            },
            {
                "label": [
                    {
                        "_text": "가능성 여부"
                    },
                    {
                        "_text": "부작용 발생 가능성"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2214_0"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2214_0"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2214_1"
                    }
                ],
                "_text": "부작용 발생 가능성 (Y or N)"
            },
            {
                "label": [
                    {
                        "_text": "제품명"
                    },
                    {
                        "_text": "소비자안전을 위한 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2215_0"
                    },
                    {
                        "_tag": "2215_1"
                    }
                ],
                "_text": "제품명"
            }
        ]
    },
    {
        "infoCode": "23",
        "infoName": "영유아용품",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2301_0"
                    },
                    {
                        "_tag": "2301_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증유형"
                    },
                    {
                        "_text": "인증번호"
                    }
                ],
                "comboBox": {
                    "_tag": "2302_0"
                },
                "textBox": [
                    {
                        "_tag": "2302_1"
                    }
                ],
                "_text": "어린이제품 안전 특별법 상 안전인증대상어린이제품, 안전확인대상어린이제품, 공급자적합성확인대상어린이제품에 대한 KC인증 필 유무"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "중량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2303_0"
                    },
                    {
                        "_tag": "2303_1"
                    }
                ],
                "_text": "크기, 중량"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2304"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "재질"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2305"
                    }
                ],
                "_text": "재질 (섬유의 경우 혼용률)"
            },
            {
                "label": [
                    {
                        "_text": "사용연령 및 체중범위"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2306"
                    }
                ],
                "_text": "사용연령 및 체중범위 (품질 경영 및 공산품안전관리법에 따라 표시해야 하는 사항은 반드시 표기)"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2307"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2308_0"
                    },
                    {
                        "_tag": "2308_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2308_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2308_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2309"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2310"
                    }
                ],
                "_text": "취급방법 및 취급시 주의사항, 안전표시 (주의, 경고 등)"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2311"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2312"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "24",
        "infoName": "악기",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2401_0"
                    },
                    {
                        "_tag": "2401_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2402"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2403"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "재질"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2404"
                    }
                ],
                "_text": "재질"
            },
            {
                "label": [
                    {
                        "_text": "제품 구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2405"
                    }
                ],
                "_text": "제품 구성"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2406"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2407_0"
                    },
                    {
                        "_tag": "2407_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2407_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2407_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2408"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "상품별 세부사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2409"
                    }
                ],
                "_text": "상품별 세부 사양"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2410"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2411"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "25",
        "infoName": "스포츠용품",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2501_0"
                    },
                    {
                        "_tag": "2501_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "크기"
                    },
                    {
                        "_text": "중량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2502_0"
                    },
                    {
                        "_tag": "2502_1"
                    }
                ],
                "_text": "크기"
            },
            {
                "label": [
                    {
                        "_text": "색상"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2503"
                    }
                ],
                "_text": "색상"
            },
            {
                "label": [
                    {
                        "_text": "재질"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2504"
                    }
                ],
                "_text": "재질"
            },
            {
                "label": [
                    {
                        "_text": "제품 구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2505"
                    }
                ],
                "_text": "제품 구성"
            },
            {
                "label": [
                    {
                        "_text": "출시년월"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2506"
                    }
                ],
                "_text": "동일모델의 출시년월 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2507_0"
                    },
                    {
                        "_tag": "2507_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "2507_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "2507_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능, 병행수입의 경우“병행수입”입력하면 처리가능)"
            },
            {
                "label": [
                    {
                        "_text": "제조국"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2508"
                    }
                ],
                "_text": "제조국"
            },
            {
                "label": [
                    {
                        "_text": "상품별 세부사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2509"
                    }
                ],
                "_text": "상품별 세부 사양"
            },
            {
                "label": [
                    {
                        "_text": "품질보증기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2510"
                    }
                ],
                "_text": "품질보증기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2511"
                    }
                ],
                "_text": "A/S 책임자와 전화번호"
            }
        ]
    },
    {
        "infoCode": "26",
        "infoName": "서적",
        "data": [
            {
                "label": [
                    {
                        "_text": "도서명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2601"
                    }
                ],
                "_text": "도서명"
            },
            {
                "label": [
                    {
                        "_text": "저자"
                    },
                    {
                        "_text": "출판사"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2602_0"
                    },
                    {
                        "_tag": "2602_1"
                    }
                ],
                "_text": "저자, 출판사"
            },
            {
                "label": [
                    {
                        "_text": "높이"
                    },
                    {
                        "_text": "전자책용량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2603_0"
                    },
                    {
                        "_tag": "2603_1"
                    }
                ],
                "_text": "크기 (전자책의 경우 파일의 용량)"
            },
            {
                "label": [
                    {
                        "_text": "쪽수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2604"
                    }
                ],
                "_text": "쪽수 (전자책의 경우 ‘해당없음’ 입력)"
            },
            {
                "label": [
                    {
                        "_text": "제품 구성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2605"
                    }
                ],
                "_text": "제품 구성 (전집 또는 세트일 경우 낱권 구성, CD 등)"
            },
            {
                "label": [
                    {
                        "_text": "출간일"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2606"
                    }
                ],
                "_text": "출간일 예) 2012-10"
            },
            {
                "label": [
                    {
                        "_text": "목차 또는 책소개"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2607"
                    }
                ],
                "_text": "목차 또는 책소개 (아동용 학습교재의 경우 사용연령을 포함)"
            },
            {
                "label": [
                    {
                        "_text": "ISBN"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2608"
                    }
                ],
                "_text": "ISBN"
            }
        ]
    },
    {
        "infoCode": "27",
        "infoName": "호텔 / 펜션 예약",
        "data": [
            {
                "label": [
                    {
                        "_text": "국가 또는 지역명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2701"
                    }
                ],
                "_text": "국가 또는 지역명"
            },
            {
                "label": [
                    {
                        "_text": "숙소형태"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2702"
                    }
                ],
                "_text": "숙소형태"
            },
            {
                "label": [
                    {
                        "_text": "등급"
                    },
                    {
                        "_text": "객실타입"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2703_0"
                    },
                    {
                        "_tag": "2703_1"
                    }
                ],
                "_text": "등급, 객실타입"
            },
            {
                "label": [
                    {
                        "_text": "사용가능 인원"
                    },
                    {
                        "_text": "인원 추가 시 비용"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2704_0"
                    },
                    {
                        "_tag": "2704_1"
                    }
                ],
                "_text": "사용가능 인원, 인원 추가 시 비용"
            },
            {
                "label": [
                    {
                        "_text": "부대시설"
                    },
                    {
                        "_text": "제공 서비스"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2705_0"
                    },
                    {
                        "_tag": "2705_1"
                    }
                ],
                "_text": "부대시설, 제공 서비스 (조식 등)"
            },
            {
                "label": [
                    {
                        "_text": "취소 규정"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2706"
                    }
                ],
                "_text": "취소 규정 (환불, 위약금 등)"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2707"
                    }
                ],
                "_text": "예약담당 연락처"
            }
        ]
    },
    {
        "infoCode": "28",
        "infoName": "여행 상품",
        "data": [
            {
                "label": [
                    {
                        "_text": "여행사"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2801"
                    }
                ],
                "_text": "여행사"
            },
            {
                "label": [
                    {
                        "_text": "이용항공편"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2802"
                    }
                ],
                "_text": "이용항공편"
            },
            {
                "label": [
                    {
                        "_text": "여행기간"
                    },
                    {
                        "_text": "일정"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2803_0"
                    },
                    {
                        "_tag": "2803_1"
                    }
                ],
                "_text": "여행기간 및 일정"
            },
            {
                "label": [
                    {
                        "_text": "총 예정 인원"
                    },
                    {
                        "_text": "출발 가능 인원"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2804_0"
                    },
                    {
                        "_tag": "2804_1"
                    }
                ],
                "_text": "총 예정 인원, 출발 가능 인원"
            },
            {
                "label": [
                    {
                        "_text": "숙박정보"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2805"
                    }
                ],
                "_text": "숙박정보"
            },
            {
                "label": [
                    {
                        "_text": "포함 내역"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2806"
                    }
                ],
                "_text": "포함 내역 (식사, 인솔자, 공연관람, 관광지 입장료, 유류할증료, 공항이용료, 관련 세금 및 공과금 등)"
            },
            {
                "label": [
                    {
                        "_text": "추가 경비"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2807"
                    }
                ],
                "_text": "추가 경비 항목과 금액 (유류할증료가 가격에 포함되지 않은 경우 그 금액과 변동가능성, 선택관광, 안내원 봉사료 등)"
            },
            {
                "label": [
                    {
                        "_text": "취소 규정"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2808"
                    }
                ],
                "_text": "취소 규정 (환불, 위약금 등)"
            },
            {
                "label": [
                    {
                        "_text": "여행경보단계"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2809"
                    }
                ],
                "_text": "해외여행의 경우 외교통상부가 지정하는 여행경보단계"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2810"
                    }
                ],
                "_text": "예약담당 연락처"
            }
        ]
    },
    {
        "infoCode": "29",
        "infoName": "항공권",
        "data": [
            {
                "label": [
                    {
                        "_text": "요금조건"
                    },
                    {
                        "_text": "왕복·편도 여부"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2901_0"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "왕복",
                        "_tag": "2901_1"
                    },
                    {
                        "_text": "편도",
                        "_checked": "True",
                        "_tag": "2901_1"
                    }
                ],
                "_text": "요금조건, 왕복·편도 여부"
            },
            {
                "label": [
                    {
                        "_text": "유효기간"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2902"
                    }
                ],
                "_text": "유효기간 예) 2012-10-25"
            },
            {
                "label": [
                    {
                        "_text": "제한사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2903"
                    }
                ],
                "_text": "제한사항 (출발일, 귀국일 변경가능 여부 등)"
            },
            {
                "label": [
                    {
                        "_text": "티켓수령방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2904"
                    }
                ],
                "_text": "티켓수령방법"
            },
            {
                "label": [
                    {
                        "_text": "좌석종류"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2905"
                    }
                ],
                "_text": "좌석종류"
            },
            {
                "label": [
                    {
                        "_text": "추가 경비"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2906"
                    }
                ],
                "_text": "가격에 포함되지 않은 내역 및 금액 (유류할증료, 공항이용료, 관광지 입장료, 안내원수수료, 식사비용, 선택사항 등)"
            },
            {
                "label": [
                    {
                        "_text": "취소 규정"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2907"
                    }
                ],
                "_text": "취소 규정 (환불, 위약금 등)"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "2908"
                    }
                ],
                "_text": "예약담당 연락처"
            }
        ]
    },
    {
        "infoCode": "30",
        "infoName": "자동차 대여 서비스 (렌터카)",
        "data": [
            {
                "label": [
                    {
                        "_text": "차종"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3001"
                    }
                ],
                "_text": "차종"
            },
            {
                "label": [
                    {
                        "_text": "소유권 이전 조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3002"
                    }
                ],
                "_text": "소유권 이전 조건 (소유권이 이전되는 경우에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "추가 선택 시 비용"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3003"
                    }
                ],
                "_text": "추가 선택 시 비용 (자차면책제도, 내비게이션 등)"
            },
            {
                "label": [
                    {
                        "_text": "연료대금 정산방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3004"
                    }
                ],
                "_text": "차량 반환 시 연료대금 정산 방법"
            },
            {
                "label": [
                    {
                        "_text": "소비자 책임"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3005"
                    }
                ],
                "_text": "차량의 고장·훼손 시 소비자 책임"
            },
            {
                "label": [
                    {
                        "_text": "환불 기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3006"
                    }
                ],
                "_text": "예약 취소 또는 중도 해약 시 환불 기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3007"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "31",
        "infoName": "물품대여 서비스 (정수기/비데/공기청정기 등)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3101_0"
                    },
                    {
                        "_tag": "3101_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "소유권 이전조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3102"
                    }
                ],
                "_text": "소유권 이전 조건 (소유권이 이전되는 경우에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "유지보수 조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3103"
                    }
                ],
                "_text": "유지보수 조건 (점검·필터교환 주기, 추가 비용 등)"
            },
            {
                "label": [
                    {
                        "_text": "소비자 책임"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3104"
                    }
                ],
                "_text": "상품의 고장·분실·훼손 시 소비자 책임"
            },
            {
                "label": [
                    {
                        "_text": "환불 기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3105"
                    }
                ],
                "_text": "중도 해약 시 환불 기준"
            },
            {
                "label": [
                    {
                        "_text": "제품 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3106"
                    }
                ],
                "_text": "제품 사양 (용량, 소비전력 등)"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3107"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "32",
        "infoName": "물품대여 서비스 (서적/유아용품/행사용품 등)",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3201_0"
                    },
                    {
                        "_tag": "3201_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "소유권 이전조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3202"
                    }
                ],
                "_text": "소유권 이전 조건 (소유권이 이전되는 경우에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "소비자 책임"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3203"
                    }
                ],
                "_text": "상품의 고장·분실·훼손 시 소비자 책임"
            },
            {
                "label": [
                    {
                        "_text": "환불 기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3204"
                    }
                ],
                "_text": "중도 해약 시 환불 기준"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3205"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "33",
        "infoName": "디지털 콘텐츠 (음원/게임/인터넷강의 등)",
        "data": [
            {
                "label": [
                    {
                        "_text": "제작자/공급자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3301"
                    }
                ],
                "_text": "제작자 또는 공급자"
            },
            {
                "label": [
                    {
                        "_text": "이용조건"
                    },
                    {
                        "_text": "이용기간"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3302_0"
                    },
                    {
                        "_tag": "3302_1"
                    }
                ],
                "_text": "이용조건, 이용기간"
            },
            {
                "label": [
                    {
                        "_text": "상품 제공 방식"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3303"
                    }
                ],
                "_text": "상품 제공 방식 (CD, 다운로드, 실시간 스트리밍 등)"
            },
            {
                "label": [
                    {
                        "_text": "최소시스템 사양"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3304"
                    }
                ],
                "_text": "최소 시스템 사양, 필수 소프트웨어"
            },
            {
                "label": [
                    {
                        "_text": "해지효과"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3305"
                    }
                ],
                "_text": "청약철회 또는 계약의 해제·해지에 따른 효과"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3306"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "34",
        "infoName": "상품권 / 쿠폰",
        "data": [
            {
                "label": [
                    {
                        "_text": "발행자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3401"
                    }
                ],
                "_text": "발행자"
            },
            {
                "label": [
                    {
                        "_text": "유효기간(시작일)"
                    },
                    {
                        "_text": "유효기간(종료일)"
                    },
                    {
                        "_text": "구매일로 부터 몇일"
                    },
                    {
                        "_text": "이용조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3402_0"
                    },
                    {
                        "_tag": "3402_1"
                    },
                    {
                        "_tag": "3402_2"
                    },
                    {
                        "_tag": "3402_3"
                    }
                ],
                "_text": "유효기간, 이용조건 (유효기간 경과 시 보상 기준, 사용제한품목 및 기간 등)"
            },
            {
                "label": [
                    {
                        "_text": "이용 가능 매장"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3403"
                    }
                ],
                "_text": "이용 가능 매장"
            },
            {
                "label": [
                    {
                        "_text": "잔액 환급 조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3404"
                    }
                ],
                "_text": "잔액 환급 조건"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3405"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "35",
        "infoName": "기타재화",
        "data": [
            {
                "label": [
                    {
                        "_text": "품명"
                    },
                    {
                        "_text": "모델명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3501_0"
                    },
                    {
                        "_tag": "3501_1"
                    }
                ],
                "_text": "품명 및 모델명"
            },
            {
                "label": [
                    {
                        "_text": "인증사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3502"
                    }
                ],
                "_text": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항"
            },
            {
                "label": [
                    {
                        "_text": "제조국/원산지"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3503"
                    }
                ],
                "_text": "제조국 또는 원산지"
            },
            {
                "label": [
                    {
                        "_text": "제조자"
                    },
                    {
                        "_text": "수입품 여부"
                    },
                    {
                        "_text": "수입자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3504_0"
                    },
                    {
                        "_tag": "3504_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "3504_1"
                    },
                    {
                        "_text": "N",
                        "_checked": "True",
                        "_tag": "3504_1"
                    }
                ],
                "_text": "제조자, 수입품의 경우 수입자를 함께 표기"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3505"
                    }
                ],
                "_text": "A/S 책임자와 전화번호 또는 소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "36",
        "infoName": "모바일쿠폰",
        "data": [
            {
                "label": [
                    {
                        "_text": "제작자/공급자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3601"
                    }
                ],
                "_text": "발행자"
            },
            {
                "label": [
                    {
                        "_text": "유효기간"
                    },
                    {
                        "_text": "이용조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3602_0"
                    },
                    {
                        "_tag": "3602_1"
                    }
                ],
                "_text": "유효기간, 이용조건 (유효기간 경과 시 보상 기준포함)"
            },
            {
                "label": [
                    {
                        "_text": "이용 가능 매장"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3603"
                    }
                ],
                "_text": "이용 가능 매장"
            },
            {
                "label": [
                    {
                        "_text": "환불조건 및 방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3604"
                    }
                ],
                "_text": "환불조건 및 방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3605"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "37",
        "infoName": "영화/공연",
        "data": [
            {
                "label": [
                    {
                        "_text": "주최 또는 기획"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3701"
                    }
                ],
                "_text": "주최 또는 기획 (공연에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "주연"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3702"
                    }
                ],
                "_text": "주연 (공연에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "관람등급"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3703"
                    }
                ],
                "_text": "관람등급"
            },
            {
                "label": [
                    {
                        "_text": "상영·공연시간"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3704"
                    }
                ],
                "_text": "상영·공연시간"
            },
            {
                "label": [
                    {
                        "_text": "상영·공연장소"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3705"
                    }
                ],
                "_text": "상영·공연장소"
            },
            {
                "label": [
                    {
                        "_text": "예매 취소 조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3706"
                    }
                ],
                "_text": "예매 취소 조건"
            },
            {
                "label": [
                    {
                        "_text": "취소·환불방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3707"
                    }
                ],
                "_text": "취소·환불방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3708"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "38",
        "infoName": "기타용역",
        "data": [
            {
                "label": [
                    {
                        "_text": "서비스 제공 사업자"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3801"
                    }
                ],
                "_text": "서비스 제공 사업자"
            },
            {
                "label": [
                    {
                        "_text": "법에 의한 인증·\r\n허가 확인 사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3802"
                    }
                ],
                "_text": "법에 의한 인증·허가 등을 받았음을 확인할 수 있는 경우 그에 대한 사항"
            },
            {
                "label": [
                    {
                        "_text": "이용조건"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3803"
                    }
                ],
                "_text": "이용조건 (이용가능 기간·장소, 추가비용 등)"
            },
            {
                "label": [
                    {
                        "_text": "취소·중도해약·해지\r\n조건 및 환불기준"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3804"
                    }
                ],
                "_text": "취소·중도해약·해지 조건 및 환불기준"
            },
            {
                "label": [
                    {
                        "_text": "취소·환불방법"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3805"
                    }
                ],
                "_text": "취소·환불방법"
            },
            {
                "label": [
                    {
                        "_text": "책임자/전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3806"
                    }
                ],
                "_text": "소비자상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "39",
        "infoName": "생활화학제품",
        "data": [
            {
                "label": [
                    {
                        "_text": "품목 및 제품명"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3901"
                    }
                ],
                "_text": "품목 및 제품명"
            },
            {
                "label": [
                    {
                        "_text": "용도"
                    },
                    {
                        "_text": "제형"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3902_0"
                    },
                    {
                        "_tag": "3902_1"
                    }
                ],
                "_text": "용도(표백제의 경우 계열을 함께 표시) 및 제형"
            },
            {
                "label": [
                    {
                        "_text": "제조연월"
                    },
                    {
                        "_text": "유통기한"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3903_0"
                    },
                    {
                        "_tag": "3903_1"
                    }
                ],
                "_text": "제조연월일 및 유통기한"
            },
            {
                "label": [
                    {
                        "_text": "중량"
                    },
                    {
                        "_text": "용량"
                    },
                    {
                        "_text": "매수"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3904_0"
                    },
                    {
                        "_tag": "3904_1"
                    },
                    {
                        "_tag": "3904_2"
                    }
                ],
                "_text": "중량ㆍ용량ㆍ매수"
            },
            {
                "label": [
                    {
                        "_text": "효과"
                    },
                    {
                        "_text": "승인대상 여부"
                    },
                    {
                        "_text": "효능"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3905_0"
                    },
                    {
                        "_tag": "3905_2"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "3905_1"
                    },
                    {
                        "_text": "N",
                        "_tag": "3905_1",
                        "_checked": "True"
                    }
                ],
                "_text": "효과ㆍ효능(승인대상 생활화학제품에 한함)"
            },
            {
                "label": [
                    {
                        "_text": "수입제품 여부"
                    },
                    {
                        "_text": "수입자"
                    },
                    {
                        "_text": "제조국"
                    },
                    {
                        "_text": "제조사"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "3906_0"
                    },
                    {
                        "_text": "N",
                        "_tag": "3906_0",
                        "_checked": "True"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3906_1"
                    },
                    {
                        "_tag": "3906_2"
                    },
                    {
                        "_tag": "3906_3"
                    }
                ],
                "_text": "수입자(수입제품에 한함), 제조국 및 제조사"
            },
            {
                "label": [
                    {
                        "_text": "어린이보호포장 대상 제품 유무"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "유",
                        "_tag": "3907"
                    },
                    {
                        "_text": "무",
                        "_tag": "3907",
                        "_checked": "True"
                    }
                ],
                "_text": "어린이보호포장 대상 제품 유무"
            },
            {
                "label": [
                    {
                        "_text": "화학물질 명칭"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3908"
                    }
                ],
                "_text": "제품에 사용된 화학물질 명칭"
            },
            {
                "label": [
                    {
                        "_text": "사용상 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3909"
                    }
                ],
                "_text": "사용상 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "신고번호 또는 승인번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3910"
                    }
                ],
                "_text": "안전기준 적합확인 신고번호(자가검사번호)또는 승인번호"
            },
            {
                "label": [
                    {
                        "_text": "전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "3911"
                    }
                ],
                "_text": "소비자 상담 관련 전화번호"
            }
        ]
    },
    {
        "infoCode": "40",
        "infoName": "살생물제품",
        "data": [
            {
                "label": [
                    {
                        "_text": "제품명"
                    },
                    {
                        "_text": "제품유형"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4001_0"
                    },
                    {
                        "_tag": "4001_1"
                    }
                ],
                "_text": "제품명 및 제품유형"
            },
            {
                "label": [
                    {
                        "_text": "중량 또는 용량"
                    },
                    {
                        "_text": "표준사용량"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4002_0"
                    },
                    {
                        "_tag": "4002_1"
                    }
                ],
                "_text": "중량 또는 용량 및 표준사용량"
            },
            {
                "label": [
                    {
                        "_text": "효과"
                    },
                    {
                        "_text": "효능"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4003_0"
                    },
                    {
                        "_tag": "4003_1"
                    }
                ],
                "_text": "효과ㆍ효능"
            },
            {
                "label": [
                    {
                        "_text": "사용대상자"
                    },
                    {
                        "_text": "사용범위"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4004_0"
                    },
                    {
                        "_tag": "4004_1"
                    }
                ],
                "_text": "사용대상자 및 사용범위"
            },
            {
                "label": [
                    {
                        "_text": "수입제품 여부"
                    },
                    {
                        "_text": "수입자"
                    },
                    {
                        "_text": "제조국"
                    },
                    {
                        "_text": "제조사"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "Y",
                        "_tag": "4005_0"
                    },
                    {
                        "_text": "N",
                        "_tag": "4005_0",
                        "_checked": "True"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4005_1"
                    },
                    {
                        "_tag": "4005_2"
                    },
                    {
                        "_tag": "4005_3"
                    }
                ],
                "_text": "수입자(수입제품에 한함), 제조국 및 제조사"
            },
            {
                "label": [
                    {
                        "_text": "어린이보호포장 대상 제품 유무"
                    }
                ],
                "radioButton": [
                    {
                        "_text": "유",
                        "_tag": "4006"
                    },
                    {
                        "_text": "무",
                        "_tag": "4006",
                        "_checked": "True"
                    }
                ],
                "_text": "어린이보호포장 대상 제품 유무"
            },
            {
                "label": [
                    {
                        "_text": "살생물물질 명칭"
                    },
                    {
                        "_text": "나노물질 명칭"
                    },
                    {
                        "_text": "유해화학물질명칭"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4007_0"
                    },
                    {
                        "_tag": "4007_1"
                    },
                    {
                        "_tag": "4007_2"
                    }
                ],
                "_text": "살생물물질, 나노물질, 유해화학물질(또는 중점관리물질)의 명칭"
            },
            {
                "label": [
                    {
                        "_text": "제품 유해성 및 위해성"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4008"
                    }
                ],
                "_text": "제품 유해성 및 위해성 표시"
            },
            {
                "label": [
                    {
                        "_text": "사용방법"
                    },
                    {
                        "_text": "사용상 주의사항"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4009_0"
                    },
                    {
                        "_tag": "4009_1"
                    }
                ],
                "_text": "사용방법 및 사용상 주의사항"
            },
            {
                "label": [
                    {
                        "_text": "승인번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4010"
                    }
                ],
                "_text": "승인번호"
            },
            {
                "label": [
                    {
                        "_text": "소비자상담 전화번호"
                    }
                ],
                "textBox": [
                    {
                        "_tag": "4011"
                    }
                ],
                "_text": "소비자상담 전화번호"
            }
        ]
    }
];

type InputType = "SELECT" | "INPUT" | "YESNO";

async function main() {
    const data = dataaa.map(v => {
        const data = v.data.map((v2, i2) => {
            const groupDescription = v2._text;
            const options = v2.label as (Label)[];
            const isSingle = options.length === 1;


            const backup_i2 = i2;
            if (v.infoCode === '20A' && i2 >= 5) i2 = i2 + 2;
            if (v.infoCode === '20B' && i2 >= 5) i2 = i2 + 2;
            if (v.infoCode === '20B' && i2 === 4) i2 = 5;
            if (v.infoCode === '20C' && i2 >= 4) i2 = i2 + 2;

            const optionss = options.map((v3, i3) => {
                const inputName = v3._text;

                const toFind = `${v.infoCode}${("00" + (i2 + 1)).slice(-2)}${isSingle ? "" : "_"}${isSingle ? "" : (i3)}`;
                let inputType: InputType | null = null;
                let selectOptions: string[] | null = null;
                if (v2.comboBox?._tag === toFind) {
                    inputType = "YESNO";
                }
                const textBox = v2.textBox?.find(v4 => v4._tag === toFind)
                if (textBox) {
                    inputType = "INPUT";
                }
                const select = v2.radioButton?.filter(v4 => v4._tag === toFind)
                if (select && select.length > 0) {
                    inputType = "SELECT";
                    select.sort((a, b) => {
                        if (a._checked === "True") return -1;
                        else return 0;
                    })
                    selectOptions = select.map(v => v._text);
                }

                if (inputType === null) {
                    console.log("아무타입도 아님", i2, backup_i2, toFind, v2)
                    throw new Error(`뭔가이상함`)
                }
                if (inputType === "SELECT" && (!selectOptions || selectOptions.length === 0)) {
                    console.log("SELECT error", toFind, v2)
                    throw new Error(`뭔가이상함`)
                }
                return { name: inputName, inputType, options: selectOptions, code: toFind }
            })
            return { desctiption: groupDescription, data: optionss }
        })
        return { ...v, data }
    })

    // console.log(data);
    // console.log(JSON.stringify(data));
    console.log(util.inspect(data, undefined, 8))
    // console.log(data.map(v => ({ code: v.infoCode, name: v.infoName })))


    console.log("---- siil sample value ----")
    const aa = siilInfo.map(siil => {
        const result: SiilOutputData = {
            infoCode: siil.infoCode,
            infoName: siilInfo.find(v => v.infoCode === siil.infoCode)!.infoName,
            infoDetail: siil.data.flatMap(v => v.data).reduce((p, c) => {
                const match = c.code.match(/(\d{2}[ABC]?\d{2})_?(\d?)/);
                // const value = c.inputType === 'INPUT' ? '상세정보참조' : c.inputType === 'YESNO' ? 'N' : c.options![0]
                const value = '상세정보참조'
                if (!match) {
                    console.log(c.code)
                    throw new Error("상품고시정보가 잘못되었습니다.");
                }
                if (match[2] !== '') {
                    p[match[1]] = p[match[1]] ? [...p[match[1]], value] : [value];
                }
                else {
                    p[match[1]] = value;
                }
                return p;
            }, {} as { [key: string]: string | string[] }),
        }
        return result;
    })
    console.log(util.inspect(aa, undefined, 8));



}

main().finally(async () => {
})