
type callBack = (data:any) => void;

export default function validateFun () {
  /**
    * [submitForm 提交校验表单]
    * @param  {[any]} formDom [HTMLElement]
    * @param  {[any]} api [接口]
    * @param  {[callBack]} callBack [回调函数]
  **/
  function submitForm (formDom:any,api:any,callback: callBack) {
    formDom.value.validate((valid: boolean) => {
        if (valid) {
          api.then((res?: any) => {
            const resData = res.data
            if (resData.code === 200) {
              const data = resData.data
              callback(data)
            }
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
  return {
    submitForm
  }
}