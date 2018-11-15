export default {
    statusInitFn(that,ids,val,api) {
        var params = new URLSearchParams();
        params.append('id', ids);
        params.append('onlineStatus', val);
        that.$axios.post(that.hostname+api,params).then(function(res){
            // 响应成功回调
            console.log(res.data);
            if(res.data.resultCode == 200) {
                that.Disabled = "";
                that.btn_turn = false;
                that.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success'
                });
            }else {
                that.$notify.error({
                  title: '错误',
                  message: res.data.message
                });
            }
        }, function(err){
            console.log(err);
        })
    },
    test() {
        console.log('wfc666666666');
    }
}
// exports.install = function (Vue, options) {
//     Vue.prototype.statusInitFn = function(ids,val){
//         var that = this;
//         console.log(that);
//         var params = new URLSearchParams();
//         params.append('id', ids);
//         params.append('onlineStatus', val);
//         this.$axios.post(that.hostname+'/manage/dsp/unit/admin/changeStatus',params).then(function(res){
//             // 响应成功回调
//             console.log(res.data);
//             if(res.data.resultCode == 200) {
//                 that.Disabled = "";
//                 that.btn_turn = false;
//                 that.$notify({
//                   title: '成功',
//                   message: res.data.message,
//                   type: 'success'
//                 });
//             }else {
//                 that.$notify.error({
//                   title: '错误',
//                   message: res.data.message
//                 });
//             }
//         }, function(err){
//             console.log(err);
//         })
//     };
// };