export default function (type:string, data:any, message:string):object {
  return {
      code:type === 'success' ? 200 : 400,
      data:data || {},
      message:message || ''
  }
}