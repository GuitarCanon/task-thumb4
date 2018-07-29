import css from '../css/index.css';
class PraiseButton{
    constructor(){
    }
    clickAction(){
        axios.get('/index/update').then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        })
    }
}

export default PraiseButton;
