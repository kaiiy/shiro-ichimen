let startTime, endTime, elapsed, now_time, hour, minutes, time, perm;
let time_list = [];
let can_click_cnt = 0;
let clear_cnt = 0;

$('.start').on('click', (event) => {
	let num = 0;
	$(event.currentTarget).css('display', 'none');
	startTime = performance.now();
	now_time = new Date();
	hour = now_time.getHours();
	minutes = now_time.getMinutes();
	time = String(hour * 100 + minutes);
	let first = 4 - time.length;
	for (let i = 0; i < first; i++) {
		time_list[i] = 0;
	}
	for (let i = first; i < 4; i++) {
		time_list[i] = parseInt(time.charAt(i - first));
	}

	while (time_list[num] == 0) {
		$('.box-' + (num + 1)).addClass('back-white');
		$('.box-' + (num + 1)).css('display', 'inline-block');
		clear_cnt++;
		can_click_cnt++;
		num++;
	}
	if (clear_cnt == 4) location.href = './clear.html';
});

let displayBack = (num) => {
	if (can_click_cnt == num - 1) {
		let cnt = num;
		endTime = performance.now();
		elapsed = (endTime - startTime) / 1000;
		perm = time_list[num - 1];
		if (perm <= elapsed && elapsed < perm + 1) {
			$('.box-' + num)
				.addClass('back-white')
				.css('display', 'inline-block');
			clear_cnt++;
		} else {
			$('.box-' + num).css('display', 'inline-block');
		}
		can_click_cnt++;

		if (cnt < 4) {
			while (time_list[cnt] == 0) {
				console.log(cnt);
				$('.box-' + (cnt + 1))
					.addClass('back-white')
					.css('display', 'inline-block');
				clear_cnt++;
				can_click_cnt++;
				cnt++;
				if (cnt == 4) break;
			}
		}

		if (clear_cnt == 4) location.href = './clear.html';

		startTime = endTime;
	}
};

$('.td-button').on('click', (event) => {
	displayBack($(event.currentTarget).data('num'));
});
