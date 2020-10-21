import {request} from "./request"

export function getDetailData(iid){
    return request({
        url:"/detail",
        params:{
            iid
        }
    })
}

export function getRecommends(){
    return request({
        url:"/recommend"
    })
}

// 封装的类，为了把数据整合，传入组件
export class goodsInfo {
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.oldPrice
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class shopInfo {
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class goodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }