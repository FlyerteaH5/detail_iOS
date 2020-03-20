//获取投票信息
if (threadpoll == "null") {
	threadpoll == "{}";
	$(".voteBox").hide();
} else {
	$(".voteBox").show();
}

var voteData = JSON.parse(threadpoll);
var app = new Vue({
	el: "#voteBox",
	data: {
		voteData: [],
		userSelect: [],
		voteState: true, //true进行中,false,已结束
		endtime: {
			day: 0,
			hour: 0,
			minute: 0
		},
	},
	created: function () {
		this.init(voteData);
	},
	methods: {
		init: function (data) { //初始化
			if (!data.polloptions) {
				return;
			}
			data.polloptions.forEach(function (item) {
				item.userSelect = false;
			})
			this.voteData = data;
			console.log(voteData);
			if (this.voteData.pollend == "1") {
				this.voteState = false;
			}
			if (this.voteData.remaintime && this.voteData.remaintime != "") {

				this.endtime = {
					day: this.voteData.remaintime[0],
					hour: this.voteData.remaintime[1],
					minute: this.voteData.remaintime[2],
				}

			}

		},
		select: function (i) {
			var maxchoices = this.voteData.maxchoices; //最多可选
			var len = 0; //已选
			if (maxchoices == 1) { //单选

				if (!this.voteData.polloptions[i].userSelect) {
					this.voteData.polloptions.forEach(function (item) {
						item.userSelect = false;
					});
					this.voteData.polloptions[i].userSelect = true;
				} else {
					this.voteData.polloptions[i].userSelect = false;
				}
				this.countSelect();
			} else { //多选
				this.voteData.polloptions.forEach(function (item) {
					if (item.userSelect) {
						len++;
					}
				});
				if (!this.voteData.polloptions[i].userSelect) {
					if (len == maxchoices) {
						return;
					} else {
						this.voteData.polloptions[i].userSelect = true;
					}

					console.log(this.voteData.polloptions);
				} else {
					this.voteData.polloptions[i].userSelect = false;
				}
				this.countSelect();
			}
		},
		countSelect: function () { //统计已选项
			var userSelect = [];
			this.voteData.polloptions.forEach(function (item) {
				if (item.userSelect) {
					userSelect.push(item.polloptionid);
				}
			});
			this.userSelect = userSelect;
		},
		submitVote: function () {
			triggerAction('clickOnVote', this.userSelect);
		}
	}
});

function changeState(arr) {
	var data = JSON.parse(arr);
	if (!data.polloptions) {
		return;
	}
	data.polloptions.forEach(function (item) {
		item.userSelect = false;
	})
	app.$data.voteData = data;
	if (app.voteData.remaintime == "") {
		app.$data.voteState = false;
	} else {
		app.$data.endtime = {
			day: this.voteData.remaintime[0],
			hour: this.voteData.remaintime[1],
			minute: this.voteData.remaintime[2],
		}
	}
}