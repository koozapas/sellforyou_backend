export interface ITranslate {
  requestId: number;
  callbackUrl: string;
  data: ITranslateData[];
}

export interface ITranslateData {
  attr: string;
  taobaoNumIid: string;
  title: string;
  optionName: ITranslateOptionName[];
  optionValue: ITranslateOptionValue[];
  video: string | null;
  description: string;
  isTranslated: boolean;
  myKeyward: string | null;
}

export interface ITranslateOptionName {
  taobaoPid: string;
  name: string;
}

export interface ITranslateOptionValue {
  name: string;
  taobaoVid: string;
  taobaoPid: string;
}
