class Calculator{
  #num1 = 0; // текущее число/результат
  #num2 = 0; // второй аргумент последней выполненной операции
  #num3 = 0; // третий аргумент для кнопок памяти
  #res = 0; // переменная результата
  #oper = ''; // операция
  #isEq = false;
  #isFractional = false;
  #counter = 0; // счетчик для запятых, чтобы исключить баг JS
  #state = 'n'; // n - number | o - operation
  #minusOnStart = false;
  #output;
  #root;

  constructor(rootSelector){
    this.#root = document.querySelector(rootSelector);
    this.#output = this.#root.querySelector('[data-output]');
    this.#root.querySelectorAll('[data-digit]').forEach(element => {
        element.onclick = event => this.#digit(event.target.dataset.digit);
    });

    this.#root.querySelectorAll('[data-action]').forEach(element => {
        element.onclick = event => this.#action(event.target.dataset.action);
    });
    this.#show();
    
  }
  #clearAll(){// правильно
    this.#num1 = 0;
    this.#num2 = 0;
    this.#oper = '';
    this.#res = 0;
    this.#isEq = false;
    this.#minusOnStart = false;
    this.#state = 'n';
    this.#isFractional = false;
    this.#counter = 0;
    this.#show(this.#res);
  }
  #clearLast(){
    if(this.#res != 0){
      this.#res = this.#num1;
    } else if(this.#num2 == this.#res){
      this.#res = 0;
    }
    this.#isEq = false;
    this.#state = 'o';
    this.#isFractional = false;
    this.#counter = 0;
  }
  #actionClearLN(){
    if(this.#num2 == 0){
      this.#num1 = Math.floor(this.#num1 * 0.1)
    } else {
      this.#num1 = Math.floor(this.#num1 * 0.1)
    }
    this.#state = 'n';
  }
  #actionPlus() {// правильно
    switch (this.#state) { 
        case 'n':
            if(this.#num1 == 0 && this.#num2 == 0  && this.#oper != ''){// 
              this.#minusOnStart = true;
              this.#oper = '';
              this.#state = 'n'
              return
            } 
            if(this.#oper == '×'){
              if(this.#res != 0){
                this.#res = this.#res * this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return 
              } else {
                this.#res = this.#num2 * this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return
              }
            }
            if(this.#oper == '÷'){
              if(this.#res != 0){
                this.#res = this.#res / this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return 
              } else {
                this.#res = this.#num2 / this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return
              }
            }
            if(this.#oper == '-'){
              if(this.#res != 0){
                this.#res = this.#res - this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return 
              } else {
                this.#res = this.#num2 - this.#num1;
                this.#oper = '+';
                this.#state = 'o';
                return
              }
            }
            if(this.#res != 0){
              this.#res += this.#num1;// 1 значение + текущее
            } else {
              this.#res = this.#num2 + this.#num1;// 1 значение + 2 значение;
            }
            break;
        case 'o':
            if (this.#isEq){
              if(this.#res != 0){
                this.#res += this.#num1;// 1 значение + текущее
              } else {
                this.#res = this.#num2 + this.#num1;// 1 значение + 2 значение;
              }
            }
            break;
    }
    this.#oper = '+';
    this.#state = 'o';
  }
  #actionMinus() {// правильно
    switch (this.#state) {
        case 'n':
          if(this.#num1 == 0 && this.#num2 == 0 && this.#oper != ''){// 
            this.#minusOnStart = true;
            this.#oper = '';
            this.#state = 'n'
            return
          }
          if(this.#oper == '+'){
            if(this.#res != 0){
              this.#res = this.#res + this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return 
            } else {
              this.#res = this.#num2 + this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return 
            }
            
          }
          if(this.#oper == '×'){
            if(this.#res != 0){
              this.#res = this.#res * this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return 
            } else {
              this.#res = this.#num2 * this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return
            }
          }
          if(this.#oper == '÷'){
            if(this.#res != 0){
              this.#res /= this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return 
            } else {
              this.#res = this.#num2 / this.#num1;
              this.#oper = '-';
              this.#state = 'o';
              return
            }
          }
          if(this.#num1 != 0 && this.#num2 != 0){
            if(this.#res != 0 ){ // если результат НЕ 0
              this.#res -= this.#num1;
            } else {// пока нету ответа заходит 1 РАЗ
              this.#res = this.#num2 - this.#num1;
            }
          }
          break;
        case 'o':
          if(this.#isEq){
            if(this.#res != 0 ){ // если результат НЕ 0
              this.#res -= this.#num1;
            } else {// пока нету ответа заходит 1 РАЗ
              this.#res = this.#num2 - this.#num1;
            }
          }
          break;
    }
    this.#oper = '-';
    this.#state = 'o';
  }
  #actionMultiple() { // правильно 
    switch(this.#state){
      case 'n':
        if(this.#num1 == 0 && this.#num2 == 0 && this.#oper != ''){// 
          this.#minusOnStart = true;
          this.#oper = '';
          this.#state = 'n'
          return
        }
        if(this.#oper == '+'){
          if(this.#res != 0){
            this.#res = this.#res + this.#num1;
            this.#oper = '×';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 + this.#num1;
            this.#oper = '×';
            this.#state = 'o';
            return 
          }
        }
        if(this.#oper == '-'){
          if(this.#res != 0){
            this.#res = this.#res - this.#num1;
            this.#oper = '-';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 - this.#num1;
            this.#oper = '-';
            this.#state = 'o';
            return
          }
        }
        if(this.#oper == '÷'){
          if(this.#res != 0){
            this.#res = this.#res / this.#num1;
            this.#oper = '×';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 / this.#num1;
            this.#oper = '×';
            this.#state = 'o';
            return 
          }
        }
        if(this.#res != 0 ){
          this.#res *= this.#num1;// 1 значение + текущее
        } else {
          this.#res = this.#num2 * this.#num1;// 1 значение + 2 значение;
        }
        break;
      case 'o':
        if(this.#isEq){
          if(this.#num1 === 0 && this.#num2 === 0){
            this.#minusOnStart = true;
          }
          if(!this.#minusOnStart){
            if(this.#res != 0){
              this.#res *= this.#num1;// 1 значение + текущее
            } else {
              this.#res = this.#num2 * this.#num1;// 1 значение + 2 значение;
            }
          } else {
            if(this.#res != 0){
              this.#res *= this.#num1;// 1 значение + текущее
            } else {
              this.#res = (this.#num2 * -1) * this.#num1;// 1 значение + 2 значение;
            }
          }
        }
        break;
    }
    this.#oper = '×';
    this.#state = 'o';
  }
  #actionDivide() { // правильно 
    switch(this.#state){
      case 'n':
        if(this.#num1 == 0 && this.#num2 == 0 && this.#oper != ''){// 
          this.#minusOnStart = true;
          this.#oper = '';
          this.#state = 'n'
          return
        }
        if(this.#oper == '+'){
          if(this.#res != 0){
            this.#res = this.#res + this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 + this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return 
          }
          
        }
        if(this.#oper == '-'){
          if(this.#res != 0){
            this.#res = this.#res - this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 - this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return
          }
        }
        if(this.#oper == '×'){
          if(this.#res != 0){
            this.#res = this.#res * this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return 
          } else {
            this.#res = this.#num2 * this.#num1;
            this.#oper = '÷';
            this.#state = 'o';
            return 
          }
        }
        if(this.#res != 0 ){
          this.#res /= this.#num1;// 1 значение + текущее
        } else {
          this.#res = this.#num2 / this.#num1;// 1 значение + 2 значение;
        }
        
        break;
      case 'o':
        if(this.#isEq){
          if(this.#num1 === 0 && this.#num2 === 0){
            this.#minusOnStart = true;
          }
          if(!this.#minusOnStart){
            if(this.#res != 0){
              this.#res /= this.#num1;// 1 значение + текущее
            } else {
              this.#res = this.#num2 / this.#num1;// 1 значение + 2 значение;
            }
          } else {
            if(this.#res != 0){
              this.#res /= this.#num1;// 1 значение + текущее
            } else {
              this.#res = (this.#num2 * -1) / this.#num1;// 1 значение + 2 значение;
            }
          }
        }
        break;
    }
    this.#oper = '÷';
    this.#state = 'o';
  }
  #actionChange() {// правильно
    if(this.#num1 != 0 && this.#num2 == 0){
      if(this.#num1 > 0){
        this.#num1 *= -1;
      } else {
        this.#num1 *= -1;
      }
      this.#show()
    } 
    if(this.#num1 != 0 && this.#num2 != 0){
      if(this.#num1 > 0){
        this.#num1 *= -1;
      } else {
        this.#num1 *= -1;
      }
      this.#show()
    }
    if(this.#res != 0 && this.#res != this.#num2){
      if(this.#res > 0){
        this.#res *= -1;
      } else {
        this.#res *= -1;
      }
      this.#show()
    }
    this.#state = 'n';
  }
  #actionPercent() {// правильно
    if(this.#num1 != 0 && this.#num2 == 0 && this.#oper == '+' || this.#oper == '-'){
      console.log('working')
      this.#num2 = this.#num1;
      this.#num1 = this.#num2 * (this.#num2 / 100) 
      this.#show()
    } else if((this.#num1 != 0 && this.#num2 == 0 && this.#oper == '×' || this.#oper == '÷')){
      this.#num2 = this.#num1;
      this.#num1 *= 0.01;
      this.#show()
    }
      else {
      this.#num1 *= 0.01;
      this.#show()
    }
    
  }
  #actionMemorySave(){
    if(this.#res == this.#num1 || this.#res == 0){// для 1-го числа
      this.#num3 = this.#num1;
    } else if(this.#num1 != 0 // для 2-го числа
           && this.#num2 != 0 
           && this.#res == this.#num2)
           { 
      this.#num3 = this.#num1;
    } else if(this.#res != this.#num1 // для результата
           && this.#res != this.#num2){ 
      this.#num3 = this.#res;
    }
    this.#state = 'o'
    this.#num1 = 0;
  }
  #actionMemoryRead(){
    if(this.#num1 == 0 && this.#num2 == 0){
      this.#num1 = this.#num3;
    } else {
      this.#num1 = this.#num3;
    }
    this.#show();
  }
  #actionMemoryClear(){
    this.#num3 = 0;
  }
  #actionMemoryPlus(){
    if(this.#res == this.#num1 || this.#res == 0){// для 1-го числа
      this.#num3 += this.#num1;
    } else if(this.#num1 != 0 // для 2-го числа
           && this.#num2 != 0 
           && this.#res == this.#num2)
           { 
      this.#num3 += this.#num1;
    } else if(this.#res != this.#num1 // для результата
           && this.#res != this.#num2){ 
      this.#num3 += this.#res;
    }
    this.#state = 'o'
    this.#num1 = 0;
  }
  #actionMemoryMinus(){
    if(this.#res == this.#num1 || this.#res == 0){// для 1-го числа
      this.#num3 -= this.#num1;
    } else if(this.#num1 != 0 // для 2-го числа
           && this.#num2 != 0 
           && this.#res == this.#num2)
           { 
      this.#num3 -= this.#num1;
    } else if(this.#res != this.#num1 // для результата
           && this.#res != this.#num2){ 
      this.#num3 -= this.#res;
    }
    this.#state = 'o'
    this.#num1 = 0;
  }
  #actionEq() { 
    this.#isEq = true;
    this.#state = 'o';
    switch (this.#oper) {
      case '+':
          this.#actionPlus();
          break;
      case '-':
          this.#actionMinus();
          break;
      case '×':
          this.#actionMultiple();
          break;
      case '÷':
          this.#actionDivide();
          break;
    }
    this.#isEq = false;
    this.#show();
  }
  #action(oper){debugger
    switch(oper){
      case 'C':
        this.#clearAll()
        break; 
      case 'CE':
        this.#clearLast()
        break;
      case '+/-': 
        this.#actionChange()
        break;
      case '%':
        this.#actionPercent()
        break;
      case 'MS':
        this.#actionMemorySave()
        break;
      case 'MR':
        this.#actionMemoryRead()
        break;
      case 'MC':
        this.#actionMemoryClear()
        break;
      case 'M+':
        this.#actionMemoryPlus()
        break;
      case 'M-':
        this.#actionMemoryMinus()
        break;
      case 'LN':
        this.#actionClearLN()
        break
      case '+':
        this.#actionPlus()
        break;
      case '-':
        this.#actionMinus()
        break;
      case '×':
        this.#actionMultiple()
        break;
      case '÷':
        this.#actionDivide()
        break;
      case '=':
        this.#actionEq()
        break;
    }
    console.log(`digit bl: n1 = ${this.#num1},  n2 = ${this.#num2}, n3 = ${this.#num3}, res = ${this.#res}`)
    // if(oper == '+/-' && this.#num2 == 0){
    //   this.#show()
    // } else if(oper == '+/-' && this.#num2 == 0){
    //   this.#show()
    // } 
    // else if(this.#oper == '%'){
    //   this.#show();
    // } else if(this.#res != 0 ){
    //   this.#show()
    // }
    this.#show()
    this.#isFractional = false;
    this.#counter = 0;
  }
  #digit(digit){
    switch(this.#state) {
      case 'n':
        console.log('digit n')
        if(isNaN(+digit)){
          this.#isFractional = true;
          return
        }
        if(this.#minusOnStart){
          if(this.#isFractional){
            this.#counter++
            this.#num1 = this.#num1 + ((+digit).toFixed(this.#counter + 1) * Math.pow(0.1, this.#counter));
          } else {
            this.#num1 = this.#num1 * 10 + +digit;
          }
          this.#num1 *= -1;
        } else {
          if(this.#isFractional){
            this.#counter++
            this.#num1 = this.#num1 + ((+digit).toFixed(this.#counter + 1) * Math.pow(0.1, this.#counter));
          } else {
            this.#num1 = this.#num1 * 10 + +digit;
          }
        }
        break;
      case 'o':
        console.log('digit o')
        this.#num2 = this.#num1;
        this.#num1 = +digit;  
        break;
    }
    console.log(`digit bl: n1 = ${this.#num1},  n2 = ${this.#num2}, n3 = ${this.#num3}, res = ${this.#res}`)
    this.#state = 'n';
    this.#minusOnStart = false;
    this.#show()
  }
  #show(){
    switch(this.#state){
      case 'n':
        this.#output.value = this.#num1;
        break;
      case 'o':
        this.#output.value = this.#res;
        break;
    }
  }
}


