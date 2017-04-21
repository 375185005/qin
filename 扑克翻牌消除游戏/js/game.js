/**
 * Created by Administrator on 2017/4/18 0018.
 */
var box={};
box.matchingGame={};
box.matchingGame.cardWidth=80;//牌宽
box.matchingGame.cardHeight=120;
box.matchingGame.deck=
    [
        "cardAK","cardAK",
        "cardAQ","cardAQ",
        "cardAJ","cardAJ",
        "cardBK","cardBK",
        "cardBQ","cardBQ",
        "cardBJ","cardBJ"
    ]
//随机排序函数，返回-1或1
function shuffle()
{
    //Math.random能返回0~1之间的数
    return Math.random()>0.5 ? -1 : 1
}
//  翻牌功能的实现
function selectCard() {
    var $fcard=$(".card-flipped");
    //翻了两张牌后退出翻牌
    if($fcard.length>1)
    {
        return;
    }
    $(this).addClass("card-flipped");
//    若翻动了两张牌，检测一致性
    var $fcards=$(".card-flipped");
    if($fcards.length==2)
    {
        // checkPattern($fcards);
        setTimeout(function(){
            checkPattern($fcards);},700);
    }
}
//检测2张牌是否一致
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");
    $(cards).removeClass("card-flipped");
    if(pattern1==pattern2)
    {
//        .bind
        $(cards).addClass("card-removed")
            .bind("webkitTransitionEnd",function(){
                $(this).remove();
            });
    }
}
$(function(){
    //实现随机洗牌
    box.matchingGame.deck.sort(shuffle);
    var $card=$(".card");
    for(var i= 0;i<11;i++)
    {
        $card.clone().appendTo($("#cards"));
    }
    //对每张牌进行设置
    $(".card").each(function(index)
    {
        //调整坐标
        $(this).css({
            "left":(box.matchingGame.cardWidth+20)*(index%4)+"px",
            "top":(box.matchingGame.cardHeight+20)*Math.floor(index/4)+"px"
        });
        //吐出一个牌号
        var pattern=box.matchingGame.deck.pop();
        //暂存牌号
        $(this).data("pattern",pattern);
        //把其翻牌后的对应牌面附加上去
        $(this).find(".back").addClass(pattern);
        //点击牌的功能函数挂接
        $(this).click(selectCard);
    });
});