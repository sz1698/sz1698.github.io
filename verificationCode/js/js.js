//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

$.fn.extend({
	puzzle: function(options) {
		var imgs = options.url;
		var imgNum = randomNum(0, imgs.length - 1);
		var url = imgs[imgNum];
		var imgBox = this.find('#img-box');
		var img = imgBox.find('img');
		img.attr('src', url);

		var scrollbarBox = this.find('#scrollbar-box');
		var scrollbarBoxWidth = scrollbarBox.width();

		var scrollbar = scrollbarBox.find('#scrollbar');
		var scrollbarWidth = scrollbar.width();

		var imgBoxWidth = imgBox.width();
		var imgBoxHeight = imgBox.height();

		var shield = imgBox.find('#shield');
		var shieldWidth = shield.width();
		var shieldHeight = shield.height();

		var puzzle = imgBox.find('#puzzle');
		var puzzleWidth = puzzle.width();

		var layer = scrollbarBox.find('#layer');

		var shieldLeft = randomNum(puzzleWidth + 50, imgBoxWidth - shieldWidth - 50);
		var shieldTop = randomNum(50, imgBoxHeight - shieldHeight - 50);
		var puzzlePositionX = imgBoxWidth - shieldLeft;
		var puzzlePositionY = -shieldTop;

		shield.css({
			left: shieldLeft,
			top: shieldTop
		});
		puzzle.css({
			left: '0px',
			top: shieldTop,
			backgroundImage: 'url(' + url + ')',
			backgroundPosition: puzzlePositionX + 'px' + ' ' + puzzlePositionY + 'px'
		});

		layer.on('mousedown', function(e) {
			scrollbar.css('transition', '');
			puzzle.css('transition', '');
			
			var scrollbarLeft = parseFloat(scrollbar.css('left'));
			var x = e.offsetX;
			if (x >= scrollbarLeft && x <= scrollbarLeft + scrollbarWidth) {
				layer.on('mousemove', function(e) {
					var nowX = e.offsetX;
					var nowLeft = scrollbarLeft + nowX - x;
					var maxLeft = scrollbarBoxWidth - scrollbarWidth;
					nowLeft = nowLeft < 0 ? 0 : nowLeft > maxLeft ? maxLeft : nowLeft;
					scrollbar.css('left', nowLeft);
					puzzle.css('left', nowLeft);
				})
				$(document).on('mouseup', function() {
					layer.off('mousemove');
					var puzzleLeft = parseFloat(puzzle.css('left'));
					if (puzzleLeft > shieldLeft - 10 && puzzleLeft < shieldLeft + 10) {
						alert('验证成功!');
						var oldNum = imgNum;
						while (imgNum == oldNum) {
							imgNum = randomNum(0, imgs.length - 1);
						}
						url = imgs[imgNum];
						img = imgBox.find('img');
						img.attr('src', url);

						shieldLeft = randomNum(puzzleWidth + 50, imgBoxWidth - shieldWidth - 50);
						shieldTop = randomNum(50, imgBoxHeight - shieldHeight - 50);
						puzzlePositionX = imgBoxWidth - shieldLeft;
						puzzlePositionY = -shieldTop;

						shield.css({
							left: shieldLeft,
							top: shieldTop
						});
						puzzle.css({
							left: '0px',
							top: shieldTop,
							backgroundImage: 'url(' + url + ')',
							backgroundPosition: puzzlePositionX + 'px' + ' ' + puzzlePositionY + 'px'
						});
						scrollbar.css('left', '0px');
					}else{
						scrollbar.css('left', '0px');
						puzzle.css('left', '0px');
						scrollbar.css('transition', 'all .8s');
						puzzle.css('transition', 'all .8s');
					}
				})
			}
		});
	}
})
