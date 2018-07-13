this.listParams.applyTime.forEach((val,idx,arr)=>{
            arr[idx] = dayjs(val).format('YYYY年MM月DD日 HH:mm:ss');
          })
          let newArr = this.listParams.applyTime.map(val=>{
            console.log(val);
            return dayjs(val).format('YYYY年MM月DD日 HH:mm:ss');//.toObject()
          })
          console.log(newArr);



                //超时默认操作
      // defaultAgreeRefund(){
      //   let countDown = this.initCountDown(5);
      //   let num = countDown.replace(/[^0-9]/ig,"");
      //   console.log(num);
      // },