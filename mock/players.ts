import faker from 'faker'
import { Response, Request } from 'express'
import { heros } from './heros'
import { Hero } from '../src/api/types'

// 使用中文名称
faker.locale = 'zh_CN'

// 模拟用户数据
const palyerCount = 100
const palyerList: Player[] = []

for (let i = 1; i < palyerCount; i++){
  palyerList.push({
    id: i,
    accoutname: faker.name.findName(),
    avatar: faker.image.avatar(),
    nickname: faker.name.findName(),
    level: faker.random.number(30), //等级
    exp: faker.random.number(999999), //经验
    rank: faker.random.number(200), //段位
    bravepoints: faker.random.number(1000),
    winningstreak: faker.random.number(10),
    wanttoplay: Array.from(getWantoplay()),
  })
}

function getWantoplay() {
  let wanttoplay: Set<Hero> = new Set();
}

export const getPlayers = (req: Request, res: Response) => {
  res.json([1,2,3])
}