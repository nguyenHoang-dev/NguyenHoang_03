var a = 10;
var b = 20;
b = 9;
if(a>b){
    // vì điều kiện a > b trả về True nên lệnh trong if được thực hiện
    document.writeln('a lớn hơn b');
}
else{
    document.writeln('a nhỏ hơn b');
}

for ( var i = 0; i < 15; i++){
    document.writeln("Anh xin loi em huhuhuhuhuhuh")
}

var i = 1;
while (i <= 20) {
    document.writeln("Siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    i++;
}
var i = 1;
do {
    document.write("Anh den tu hanh tinh nao vay")
    i++;
} while ( i <= 10);

var  tong1 = 0;
var  tong2 = 0;
var  tong3 = 0;

// tinh tong von lap for
for ( var i = 1; i <= 100; i++){
    tong1 += i;
    document.writeln("Tong 1 la: " + tong1);
}
// tinh tong von lap while
var j = 1;
while ( j <= 100){
    tong2 += j;
    document.writenlm("Tong 2 la: " + tong2);
    j++;
}
// tinh tong von lap do do
var k = 1;
do{
    tong3 += k;
    k++;
}while(k <= 49);
document.writeln("Tong 3 la: " + tong3);
// tinh tong 1 + 2 + 3 + ... + n

