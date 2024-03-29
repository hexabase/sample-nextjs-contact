export const DEFAULT_PARAM_SEARCH = {
  PAGE: 1,
  PER_PAGE: 10
}

export const DEFAULT_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['5', '10', '20', '30'];

export const FADED = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  config: {
    duration: 500,
  },
};

export const MENU_LABEL = {
  TOP_PAGE: "トップ",
  INQUIRY_PAGE: "お問い合わせ",
};

export const PARAM_TOP_BAR_TITLE = {
  TOP_PAGE: "トップ",
  INQUIRY_PAGE: "お問い合わせ一覧",
  CREATE_INQUIRY_PAGE: "お問い合わせ登録"
};

export const inquiryStatus = [
  {
    display: "新規",
    nextStatus: "作業中",
    previousStatus: "",
    id: "2592dc66-44cf-4d86-9ecd-9c15c27c3ede"
  },
  {
    display: "作業中",
    nextStatus: "完了",
    previousStatus: "新規",
    id: "78b68059-429f-4d3b-b43f-07f37b5e69b3"

  },
  {
    display: "完了",
    nextStatus: "確認",
    previousStatus: "作業中",
    id: "b05c9d79-2769-49a1-8b50-35cf278eccf1"
  },
  {
    display: "確認",
    nextStatus: "受付",
    previousStatus: "完了",
    id: "d8191865-cbae-424c-a007-fec4bc906dbb"
  },
  {
    display: "受付",
    nextStatus: "",
    previousStatus: "確認",
    id: "d8607c9b-2845-4372-b7cd-50633435c660"
  }
];

export const inquiryImportance = [
  {
    label: "高",
    value: "0ccf7cba-a38d-4f5a-92c5-bba1a5f56b8d"
  },
  {
    label: "中",
    value: "559c5ef3-ea35-4d3d-b250-fdc5737e66ab"
  },
  {
    label: "低",
    value: "16c2e64d-693d-49eb-b808-884167473a3a"
  },
];

export const inquiryUrgency = [
  {
    label: "高",
    value: "8b6f203c-0bad-4887-8a11-8d2c5cb98925"
  },
  {
    label: "中",
    value: "162039d3-37e4-47c7-be85-1fadcf837521"
  },
  {
    label: "低",
    value: "efedb39c-0924-45ec-9496-0cd7abcf0db4"
  },
];

export const inquiryPriority = [
  {
    label: "高",
    value: "57c22be8-b3b7-41f3-9a59-369fdb67e8ae"
  },
  {
    label: "中",
    value: "52e70013-5193-4f1d-951d-ef726e7a0578"
  },
  {
    label: "低",
    value: "8fe047b2-ae98-4371-a57c-1519c2ea6671"
  },
];

export const inquiryStatusParams = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmation": {
      return {
        borderColor: "#487CA5",
        color: "#487CA5",
        display: "確認"
      };
    }
    case "reception": {
      return {
        borderColor: "#B35488",
        color: "#B35488",
        display: "受付"
      };
    }
    case "completion": {
      return {
        borderColor: "#548164",
        color: "#548164",
        display: "完了"
      };
    }
    case "working": {
      return {
        borderColor: "#8A67AB",
        color: "#8A67AB",
        display: "作業中"
      };
    }
    case "new": {
      return {
        borderColor: "#C4554D",
        color: "#C4554D",
        display: "新規"
      };
    }
    default:
      break;
  }
};

const optionStatus: { label: string; value: string }[] = [];

inquiryStatus.forEach((item) => {
  optionStatus.push({
    label: item.display,
    value: item.id
  });
});

export default optionStatus;
