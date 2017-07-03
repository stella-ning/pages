var data = [
    {"id":1, "title":"信宜1", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":2, "title":"信宜2", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":3, "title":"信宜3", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":4, "title":"信宜4", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":5, "title":"信宜5", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":6, "title":"信宜6", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":7, "title":"信宜7", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":8, "title":"信宜8", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":9, "title":"信宜9", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":10, "title":"信宜10", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":11, "title":"信宜11", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":12, "title":"信宜12", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":13, "title":"信宜13", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":14, "title":"信宜14", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":15, "title":"信宜15", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":16, "title":"信宜16", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":17, "title":"信宜17", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":18, "title":"信宜18", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":19, "title":"信宜19", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":20, "title":"信宜19", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"},
    {"id":21, "title":"信宜20", "content":"信宜信宜信宜信宜信宜信宜信宜信宜信宜"}
];

var Page = {
    data ,
    total_page(){
        //计算总页数
        if(!this.page) return false;
        this.total =Math.ceil( this.data.length/this.page );
        return this;
    },
    //初始化
    init(page){
        //分页数
        this.page = page;
        //分页数量
        this.page_data = [];
        //当前页
        this.now_page;
        //html内容
        this.html;
        //执行第一个方法,计算出总页数
        this.total_page();
        return this;
    },
    next(now_page){
        //下一页
        this.getData(now_page-1);
        this.genHtml();
    },
    prev(now_page){
        //下一页
        this.getData(now_page+1);
        this.genHtml();
    },
    getData(now_page){
        //获取数据 0-5 6-11 12-17 17-20
        //当前页
        this.now_page = now_page;
        this.page_data = [];
        this.html = "";
        var now;
        var limit;
        var start;
        //要取数据 有开始位置,同最终位置
        if(now_page <= 0 || now_page ==1 ) {
            now = 1;
            start = 0;
            limit = this.page;

        }else if(now_page >= this.total) {
            now = this.total;
            start = parseInt(this.total-1) * this.page;
            limit =  this.data.length;
        }else {
            now = now_page;
            start = parseInt(now_page-1) * this.page;
            limit = this.page * now_page;
        }
        //获取
        for(var i = start; i<limit; i++){
            //this.page_data.push(this.data[i])
            this.html +="<h1>"+this.data[i].id+"</h1>" +
                "<span>"+this.data[i].title+"</span>"+
                    "<div>"+this.data[i].content+"<div/>"+
                    "<hr/>";
        }
        //console.log(this.html);
        return this;
    },
    genHtml(){
        //添加html
        var content = document.getElementById("content");
        content.innerHTML=this.html;
        this.nav();
        return this;
    },
    nav(){
        //导航条
        var page = document.getElementById('page');
        var html="";
        var next = "<button onclick='next()'>next</button>";
        var prev =  "<button onclick='prev()'>prev</button>";
        for(var i=1; i<=this.total; i++){
            html +=
                "<input type='button' onclick='jump(this)' value="+i+"></input>";
        }
        //console.log(html);
        page.innerHTML = next+html+prev;
    }


};




// 总页数     每一页数量     数据总数量   总共页
Page.init(6);
Page.getData(0).genHtml();

function jump(that){
    Page.getData(that.value).genHtml();
    //console.log(Page.now_page);
}

function next(){
    var now = Page.now_page;
    if(now <=0){
        now = 1;
    }
    Page.getData(now-1).genHtml();
}
function prev(){
    var now = Page.now_page;
    if(now <=0 ) {
        now = 1;
    }
    Page.getData(now+1).genHtml();
}
