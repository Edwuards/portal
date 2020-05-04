/*
  All RULES must have a test and message property
  All test must return true if passed or false if failed.
  If test returns false the message will be available to log
  All test function can not be anonymous
  Rule = {
    message: string
    test: (value)=>{ return false || true }
  }
*/
const Rules = {};
const RULES = {};


RULES.is = {};
RULES.has = {};
RULES.validate = {};

// RULES FOR IS TYPE

RULES.is.object = {
  message: 'The parameter is not an object type',
  test: function(value){
    if( Array.isArray(value) || typeof value !== 'object' ){ return false; };
    return true;
  }
}

RULES.is.notDuplicateProperty = {
  message: 'The property already exist inside the object ',
  test: function(property,object){
    let test = this.rules.is.string(property);
    if(!test.passed){this.message = test.error; return false; }

    test = this.rules.is.object(object);
    if(!test.passed){ this.message = test.error; return false; }


    if(object[property] !== undefined ){
      return false
    }
    return true
  }
}

RULES.is.string = {
  message: 'The parameter is not a string type',
  test: function(value){
    if(typeof value !== 'string'){ return false; }
    return true;
  }
}

RULES.is.number = {
  message: 'The parameter is not a number type',
  test: function(value){
    if(typeof value !== 'number'){ return false; }
    return true;
  }
}

RULES.is.array = {
  message: 'The paramter is not an Array type',
  test: function(value){ return Array.isArray(value); }
}

RULES.is.instanceOf = {
  message: 'The object given is not an instance of',
  test: function(compare,against){
    let test = this.rules.is.object(compare);
    if(!test.passed){ this.message = test.error; return false; }

    test = this.rules.is.function(against);{
    if(!test.passed){ this.message = test.error; return false; }}

    if(!(compare instanceof against)){
      this.message = `${this.message} ${against.name}`;
      return false
    }
    return true
  }
}

RULES.is.function = {
  message: 'The property is not a function',
  test: function(value){
    if(typeof value !== 'function'){ return false; }
    return true;
  }
}

RULES.is.greaterThan = {
  message: 'The value',
  test: function(check,against){
    let test = this.rules.is.number(check);
    if(!test.passed){ this.message = test.error; return false; }

    test = this.rules.is.number(against);
    if(!test.passed){ this.message = test.error; return false; }

    if(check < against){
      this.message = `${this.message} ${check} is not greater than ${against}`;
      return false;
    }
    return true;
  }
}

RULES.is.htmlChildren = {
  message: 'The followin object does not posses an array property with HTMLElement instances ',
  test: function(children){
    if(!Array.isArray(children)){ return false };
    if(children.some((child)=>{ return !(child instanceof HTMLElement) })){ return false }
    return true;
  }
}

RULES.is.defined = {
  message: 'The following property is not defined ',
  test: function(property,object){
    let test = this.rules.is.string(property);
    if(!test.passed){ this.message = test.error; return false; }

    test = this.rules.is.object(object);
    if(!test.passed){ this.message = test.error; return false; }

    if(object[property] === undefined ){ this.message += 'property'; return false; }
    return true;
  }
}

RULES.is.notEmptyArray = {
  message: 'The given array is empty',
  test: function(array){
    let test = this.rules.is.array(array);
    if(!test.passed){ this.message = test.error; return false; }

    return array.length != 0
  }
}

// RULES FOR HAS TYPE

RULES.has.arrayLength = {
  message:'The array must have a length of ',
  test: function(array,length){
    let test = this.rules.is.array(array);
    if(!test.passed){ this.message = test.error; return false}

    test = this.rules.is.number(length);
    if(!test.passed){ this.message = test.error; return false}

    if(array.length !== length){ return false }
    return true
  }
}

RULES.has.properties = {
  message: 'The object does not have all of the following properties ',
  test: function(properties,object){
    let test = this.rules.is.object(object);
    if(!test.passed){ this.message = test.error; return false }

    test = this.rules.is.array(properties);
    if(!test.passed){ this.message = test.error; return false }

    (function(properties){

      properties.every(function(prop){
        test = this.rules.is.string(prop);
        return test.passed
      }.bind(this));

      return test;

    }.bind(this))(properties);

    if(!test.passed){ this.message = test.error; return false }


    if(properties.some((property)=>{ return object[property] === undefined })){
      properties.forEach(function(property){ this.message = this.message+property+' '; }.bind(this))
      return false;
    }
    return true;
  }
}

RULES.has.index = {
  message: 'The index is undefined for the given array.',
  test: function(array,index){
    let test = this.rules.is.array(array);
    if(!test.passed){ this.message = test.error; return false; }

    test = this.rules.is.number(index);
    if(!test.passed){ this.message = test.error; return false; }

    if(array[index] === undefined){ return false; }
    return true;
  }
}

for (let type in RULES) {
  for(let name in RULES[type]){
    let rule = RULES[type][name];
    if(Rules[type] == undefined){ Rules[type] = {}; }
    let context = { message: rule.message, rules: Rules };
    Rules[type][name] = function(){ return new Rule(context,rule,arguments) }
  }
}

function Rule(context,rule,args){
  this.passed = rule.test.apply(context,args);
  this.error = this.passed ? undefined : new Error(context.message);
}

function Test(tests){
  let test = undefined, rule = undefined, args = undefined;
  test = Rules.is.array(tests);
  if(!test.passed){ return test };
  tests.every((check,i)=>{

    test = Rules.is.array(check);
    if(!test.passed){ return false; }

    test = Rules.has.arrayLength(check,2);
    if(!test.passed){ return false; }

    rule = check[0]; args = check[1];

    test = Rules.is.array(args);
    if(!test.passed){ return false; }

    test = Rules.is.function(rule);
    if(!test.passed){ return false; }

    rule = rule.apply(null,args);

    test = Rules.is.instanceOf(rule,Rule);
    if(!test.passed){ return false; }

    test = rule;

    return test.passed


  });

  return test
}

export { Rules, Test }
