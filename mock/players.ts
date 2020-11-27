import faker from 'faker'
import { Response, Request } from 'express'
import { heros } from './heros'
import { Player,Hero } from '../src/api/types'

// 使用中文名称
faker.locale = 'zh_CN'

// 模拟用户数据
const palyerCount = 100
const playerList: Player[] = []

for (let i = 1; i < palyerCount; i++){
  playerList.push({
    id: i,
    acoutname: faker.name.findName(),
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
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return wanttoplay
}


export const getPlayers = (req: Request, res: Response) => {
  const { acoutname, nickname, page = 1, limit = 20 } = req.query
  
  let mockList = playerList.filter(item => {
    if (acoutname && item.acoutname.indexOf(acoutname) < 0) return false
    if (nickname && item.nickname.indexOf(nickname) < 0) return false
    return true
  })

  const pageList = mockList.filter((_, index) => index < limit * page && index >= limit + (page - 1))
  
  return res.json({
    code: 200,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'player not found'
  })
}

export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body
  return res.json({
    code: 20000,
    data: {
      player
    }
  })
}

export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body
  for (const v of playerList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'player not found'
  })
}

export const deletePlayer = (req: Response, res: Response) => {
  return res.json({
    code: 20000
  })
}