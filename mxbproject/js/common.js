
(function (doc, win) {
    		var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
            		docEl.style.fontSize = 100 +'px';
            }else{
            		docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
            }
            
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


//toast弹框提示
  function commonToast(title){
		//提示
	  	layer.open({
	    		content: title,
	    		skin: 'msg',
	    		anim: false,
	    		fixed: false,
	    		top:-300,
	    		time: 2 //2秒后自动关闭
	  	});
}

//小写转大写
function DX(numberValue) {
	var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
	var chineseValue = ""; // 转换后的汉字金额
	var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
	var String2 = "万仟佰拾亿仟佰拾万仟佰拾圆角分"; // 对应单位
	var len = numberValue.length; // numberValue 的字符串长度
	var Ch1; // 数字的汉语读法
	var Ch2; // 数字位的汉字读法
	var nZero = 0; // 用来计算连续的零值的个数
	var String3; // 指定位置的数值
	if(len > 15) {
//		alert("超出计算范围");
		return "";
	}
	if(numberValue == 0) {
		chineseValue = "零圆整";
		return chineseValue;
	}
	String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
	for(var i = 0; i < len; i++) {
		String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
		if(i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
			if(String3 == 0) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else if(String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}
		} else { // 该位是万亿，亿，万，元位等关键位
			if(String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if(String3 != 0 && nZero == 0) {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else if(String3 == 0 && nZero >= 3) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else {
				Ch1 = "";
				Ch2 = String2.substr(i, 1);
				nZero = nZero + 1;
			}
			if(i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
				Ch2 = String2.substr(i, 1);
			}
		}
		chineseValue = chineseValue + Ch1 + Ch2;
	}
	if(String3 == 0) { // 最后一位（分）为0时，加上“整”
		chineseValue = chineseValue + "整";
	}
	return chineseValue;
}

//金额格式化方法
function fmoney(s) {
	//n = n > 0 && n <= 20 ? n : 2;
	var n = 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	t = "";
	for(i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	var str = t.split("").reverse().join("") + "." + r;
	return str;
}
//检查输入金额的格式是否准确，true，正确；false，错误 jacket
function checkMoney(money){
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	//var money = "520.100";
	//000 错
	//0 对
	//0. 错
	//0.0 对
	//050 错
	//00050.12错
	//70.1 对
	//70.11 对
	//70.111错
	//500 正确
	if (reg.test(money)) {

		// alert("正确~");
		return true;
	}else{
		//  alert("有误~");

		return false;
	};
}

//金额
function changeMon() {
	var money = Number($('#quota').val()); //jacket add parseFloat
	var len = $('#quota').val().length;
	console.log(money);
	if(isNaN(money)){
		isAdd2();
		$('.error-msg').text('请输入正确的金额');
		return;
	}else{
		var exp = /^([1-9][\d]{0,12}|0)(\.[\d]{1,2})?$/;
		if(exp.test(money)) {
			var moneys = fmoney(money);

			$('#quota').val(moneys);
		}else{

		}
	}
}

function changeBtn(flag,maxNum) {
	var money =$('#quota').val();
	console.log('money',money);
	if(checkMoney(money) && parseFloat(money)>0)  // 输入金额格式正确，并且大于零时//jacket add parseFloat
	{
		if(flag){
			if(parseFloat(money)>parseFloat(maxNum)){
				isAdd2();
				$('.error-msg').text('超过最大可转出金额');
				return;
			}
		}
		isAdd1();
		console.log(1);
		$('#quota').val(money);
		var dx = DX(money);
		var result = money.indexOf(".");
		if(result == -1 && money.length>8){
			isAdd2()
			$('.error-msg').text('超过最大可输入金额');
			return;
		}
		$('.error-msg').text('金额大写：'+dx);
	}else{
		console.log('money',isNaN(money))
		if(isNaN(Number(money))  || parseFloat(money) <= 0){
			isAdd2();
			$('.error-msg').text('请输入正确的金额');
		}else{
			if(money.length!=0){
				var amount = money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
				if(flag){
					if(parseFloat(money)>parseFloat(maxNum)){
						isAdd2();
						$('.error-msg').text('超过最大可转出金额');
						return;
					}
				}
				isAdd1();
				$('#quota').val(amount);
				var dx1 = DX(amount);
				var result = money.indexOf(".");
				if(result == -1 && money.length>8){
					isAdd2()
					$('.error-msg').text('超过最大可输入金额');
					return;
				}
				$('.error-msg').text('金额大写：'+dx1);
			}else{
				isAdd2();
				$('.error-msg').text('');
			}
		}
	}
}

//是否添加class
function isAdd1(){
	if($('.error-msg').hasClass('color-ff560c')){
		$('.error-msg').removeClass('color-ff560c');

	}
	if($('#btn').hasClass('bg-ccc')){
		$('#btn').removeClass('bg-ccc');
		$('#btn').addClass('bg-50a5fc');
		$('#btn').removeAttr('disabled');
	}
}
function isAdd2(){
	if(!$('.error-msg').hasClass('color-ff560c')){
		$('.error-msg').addClass('color-ff560c');
	}
	if(!$('#btn').hasClass('bg-ccc')){
		$('#btn').addClass('bg-ccc');
		$('#btn').removeClass('bg-50a5fc');
		$('#btn').attr('disabled','disabled');
	}
}

//替换分号
function replaceAll(str){
	if(str!=null)
		str = str.replace(/,/g,"")
	return str;
}

function addCookie(name, value, expireHours) {
	var cookieString = name + "=" + escape(value) + "; path=/";
	//判断是否设置过期时间
	if (expireHours > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expireHours * 3600 * 1000);
		cookieString = cookieString + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

function getCookie(name) {
	var strcookie = document.cookie;
	var arrcookie = strcookie.split("; ");
	for (var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if (arr[0] == name) return unescape(arr[1]);
	}
	return null;
}

function delCookie(name) { //删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2];
	return '';
}

function riskPagesOperation(curPage,nextPage) {
    // 如果已经本页面已经回答过问题，获取cookie展示样式
    // if (getCookie('risk' + curPage)) {
    //     $('ul li p').each(function () {
    //         if ($(this).text() == getCookie('risk' + curPage)) {
    //             $(this).next().css('display', 'block');
    //         }
    //     });
    // }

    $('ul li').on('click',function(){
        var index = $(this).index("li");
        $('li img').each(function () {
            $(this).css('display', 'none');
        })
        $('li img').eq(index).css('display', 'block');

        //  记录选择的信息
        var riskVals = {};
        riskVals['risk' + curPage] = $(this).children('p').text().trim();
        addCookie('risk' + curPage, riskVals['risk' + curPage], 0);

        setTimeout(function () {
            location.href = 'risk-' + nextPage + '.html';
        }, 2000);
    })
}
