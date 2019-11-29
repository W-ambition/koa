import Router from 'koa-router';
import setFrontData from '../utils/response';
import { judgeSignature } from '../wechat/sha_middleware';
const router = new Router();

interface SignConfig {
  signature: string,
  timestamp: string,
  nonce: string,
  echostr: string,
}

router.get('/', async (ctx) => {
  const query:SignConfig = ctx.query;
  if(!query.signature) {
    return ctx.body = setFrontData('fail', {}, '未收到signature');
  }
  const result:boolean = judgeSignature(query);
  if(result) {
    ctx.body = query.echostr;
  }else {
    ctx.body = setFrontData('fail', {}, '校验失败');
  }
  return
})

export default router;