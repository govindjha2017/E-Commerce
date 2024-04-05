const close = document.querySelector('.btn-close');

if(close){
    close.addEventListener('click',(e)=>{
        console.log('clicked')
        console.log(e.target.parentElement)
        e.target.parentElement.remove()
    })
}
