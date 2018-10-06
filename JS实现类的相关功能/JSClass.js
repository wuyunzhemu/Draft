var people =function(name,age) {    //构造函数
  // var name=name;
  // var age=age;
  // this.name=name;
  // this.age=age;
  
  //  this.fun1 = function(){
  //    console.log(this.name+" is "+this.age+" years old");
  //  }
  //这样做在每次创建时都会创建一个fun1，而非共享，浪费内存
}

people.prototype.fun1 = function(){                //prototype为构造函数属性，也为原型对象属性，可被实例对象继承，调用时是调用原型对象的fun1
  console.log(this.name+" is "+this.age+" years old");
}

var I = new people('wyzm',21);
I.fun1();
var U = new people('dztz',250);
U.fun1();
      
//console.log(I.age);    //类外应该不允许直接访问类的属性,在构造函数用var声明属性，则为私有，用this.xx 则为公有,而类名.xx则为静态属性