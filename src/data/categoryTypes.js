// 商品类型 ID 对应 Mock 商品的 kind，后续可替换为后端分类 ID。
export const categoryTypes = {
  digital: [
    {
      title: "手机与电脑",
      items: [
        { id: "phone", name: "手机" },
        { id: "tablet", name: "平板电脑" },
        { id: "laptop", name: "笔记本电脑" },
        { id: "monitor", name: "显示器" },
      ],
    },
    {
      title: "影音与游戏",
      items: [
        { id: "camera", name: "相机" },
        { id: "headphones", name: "耳机" },
        { id: "console", name: "游戏机" },
        { id: "speaker", name: "音响" },
      ],
    },
    {
      title: "智能与配件",
      items: [
        { id: "watch", name: "智能手表" },
        { id: "keyboard", name: "键盘鼠标" },
        { id: "charger", name: "充电配件" },
      ],
    },
  ],
  fashion: [
    {
      title: "衣橱好物",
      items: [
        { id: "coat", name: "外套" },
        { id: "shirt", name: "上衣" },
        { id: "dress", name: "裙装" },
        { id: "trousers", name: "裤装" },
      ],
    },
    {
      title: "鞋履箱包",
      items: [
        { id: "shoe", name: "运动鞋" },
        { id: "boots", name: "靴子" },
        { id: "bag", name: "手提包 / 托特包" },
        { id: "backpack", name: "背包" },
        { id: "suitcase", name: "行李箱" },
      ],
    },
    {
      title: "穿搭配饰",
      items: [
        { id: "hat", name: "帽子" },
        { id: "scarf", name: "围巾" },
        { id: "jewelry", name: "首饰" },
      ],
    },
  ],
  toys: [
    {
      title: "潮玩收藏",
      items: [
        { id: "toy", name: "手办 / 摆件" },
        { id: "blind-box", name: "盲盒" },
        { id: "plush", name: "毛绒玩具" },
      ],
    },
    {
      title: "拼搭与模型",
      items: [
        { id: "blocks", name: "积木" },
        { id: "model", name: "模型" },
        { id: "puzzle", name: "拼图" },
      ],
    },
    {
      title: "动漫周边",
      items: [
        { id: "badge", name: "徽章" },
        { id: "card", name: "收藏卡" },
        { id: "poster", name: "海报" },
      ],
    },
  ],
  beauty: [
    {
      title: "香氛彩妆",
      items: [
        { id: "perfume", name: "香水" },
        { id: "lipstick", name: "口红" },
        { id: "makeup", name: "彩妆工具" },
      ],
    },
    {
      title: "个护电器",
      items: [
        { id: "hairdryer", name: "吹风机" },
        { id: "beauty-device", name: "美容仪" },
        { id: "shaver", name: "剃须刀" },
      ],
    },
    {
      title: "日常护理",
      items: [
        { id: "skincare", name: "护肤品" },
        { id: "haircare", name: "护发用品" },
      ],
    },
  ],
  books: [
    {
      title: "图书阅读",
      items: [
        { id: "books", name: "文学 / 小说" },
        { id: "textbook", name: "教材" },
        { id: "comic", name: "漫画" },
        { id: "magazine", name: "杂志" },
      ],
    },
    {
      title: "音乐与影视",
      items: [
        { id: "vinyl", name: "黑胶唱片" },
        { id: "cd", name: "CD / DVD" },
      ],
    },
    {
      title: "休闲娱乐",
      items: [
        { id: "boardgame", name: "桌游" },
        { id: "stationery", name: "文具" },
      ],
    },
  ],
  home: [
    {
      title: "家居装饰",
      items: [
        { id: "lamp", name: "灯具" },
        { id: "plant", name: "绿植 / 花盆" },
        { id: "decoration", name: "装饰摆件" },
      ],
    },
    {
      title: "家具收纳",
      items: [
        { id: "desk", name: "桌椅" },
        { id: "cabinet", name: "柜子" },
        { id: "storage", name: "收纳用品" },
      ],
    },
    {
      title: "生活电器",
      items: [
        { id: "coffee-machine", name: "咖啡机" },
        { id: "kitchen", name: "厨房电器" },
        { id: "cleaner", name: "清洁电器" },
      ],
    },
  ],
  sports: [
    {
      title: "户外出行",
      items: [
        { id: "tent", name: "帐篷" },
        { id: "camping", name: "露营装备" },
        { id: "bike", name: "自行车" },
      ],
    },
    {
      title: "运动装备",
      items: [
        { id: "shoe", name: "徒步 / 运动鞋" },
        { id: "sportswear", name: "运动服饰" },
        { id: "racket", name: "球拍" },
      ],
    },
    {
      title: "健身训练",
      items: [
        { id: "fitness", name: "健身器械" },
        { id: "yoga", name: "瑜伽用品" },
      ],
    },
  ],
  music: [
    {
      title: "弦乐与键盘",
      items: [
        { id: "guitar", name: "吉他" },
        { id: "ukulele", name: "尤克里里" },
        { id: "piano", name: "电钢琴" },
        { id: "violin", name: "小提琴" },
      ],
    },
    {
      title: "录音与演出",
      items: [
        { id: "microphone", name: "麦克风" },
        { id: "audio-interface", name: "声卡" },
        { id: "speaker", name: "音箱" },
      ],
    },
    {
      title: "乐器配件",
      items: [
        { id: "strings", name: "琴弦" },
        { id: "music-accessories", name: "支架 / 琴包" },
      ],
    },
  ],
};

export function getTypeName(category, type) {
  return (
    categoryTypes[category]
      ?.flatMap((group) => group.items)
      .find((item) => item.id === type)?.name || ""
  );
}
