const config = {
	img_src: ["b1.png", "b2.png", "b3.png"],
	main_page_url: "path/to/main"
};
function addImage(src, dest){
	let temp_img = document.createElement("img");
	temp_img.src = src;
	dest.appendChild(temp_img);
	return temp_img;
}
var introduction = {
	imgs: Array(),
	progress: null,
	current_index: -1,
	listener_helper: {
		startX: -1,
		startY: -1
	},
	init: function(){
		let container = document.getElementById("img-container");
		this.progress = document.getElementById("progress");
		config.img_src.forEach(img=>{
			this.imgs.push(addImage("source/img/" + img, container));
		});
		this.scrollNext();
		window.addEventListener("touchstart", function(e){
			e.preventDefault();
			this.listener_helper.startX = e.changedTouches[0].pageX;
　　　　		this.listener_helper.startY = e.changedTouches[0].pageY;
		}, false);
		window.addEventListener("touchend", function(e){
			e.preventDefault();
			let moveX = e.changedTouches[0].pageX - this.listener_helper.startX;
			let moveY = e.changedTouches[0].pageY - this.listener_helper.startY;
　　　　		if(Math.abs(X) > Math.abs(Y) && X > 0) this.scrollPrevious();
			else if (Math.abs(X) > Math.abs(Y) && X < 0) this.scrollNext();
		}, false);
		this.imgs[this.imgs.length - 1].addEventListener("click", this.scrollNext, false);
	},
	scrollNext: function(){
		if(this.current_index == this.imgs.length - 1){
			window.location.href = config.main_page_url;
			return;
		}
		if(this.current_index >= 0){
			this.imgs[this.current_index].classList.remove("roll-in-left");
			this.imgs[this.current_index].classList.remove("roll-in-right");
			this.imgs[this.current_index].classList.add("roll-out-left");
		}
		++this.current_index;
		this.imgs[this.current_index].classList.remove("roll-out-right");
		this.imgs[this.current_index].classList.remove("roll-out-left");
		this.imgs[this.current_index].classList.add("roll-in-right");
		this.progress.style.width = ((this.current_index + 1) / this.imgs.length * 100) + "%";
	},
	scrollPrevious: function(){
		if(this.current_index <= 0) return;
		this.imgs[this.current_index].classList.remove("roll-in-left");
		this.imgs[this.current_index].classList.remove("roll-in-right");
		this.imgs[this.current_index--].classList.add("roll-out-right");
		this.imgs[this.current_index].classList.remove("roll-out-right");
		this.imgs[this.current_index].classList.remove("roll-out-left");
		this.imgs[this.current_index].classList.add("roll-in-left");
		this.progress.style.width = ((this.current_index + 1) / this.imgs.length * 100) + "%";
	}
}
window.onload=function(){
	introduction.init();
}