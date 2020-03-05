$(function() {

    //左カラム文字エフェクト
    for(let i = 0; i <= 10; i++) {
        $('#left-area').append('<p class="left-text doom'+ i +'">CSV!!Doom!!</p>');
        $('#left-area p').fadeIn(1000);
     }

     //右カラム文字エフェクト
     for(let j = 0; j <= 10; j++) {
        $('#right-area').append('<p class="right-text doon'+ j +'">CSV!!どーーん!!</p>');
        $('#right-area p').fadeIn(1000);
     }


});