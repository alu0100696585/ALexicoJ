"use strict";
// tokens.js
// 2010-02-23

// Produce an array of simple token objects from a string.
// A simple token object contains these members:
//      type: 'name', 'string', 'number', 'operator'
//      value: string or number value of the token
//      from: index of first character of the token
//      to: index of the last character + 1

// Comments are ignored.

RegExp.prototype.bexec = function(str) {
  var i = this.lastIndex;
  var m = this.exec(str);
  if (m && m.index == i) return m;
  return null;
}

String.prototype.tokens = function () {
    var from;                   // The index of the start of the token.
    var i = 0;                  // The index of the current character.
    var n;                      // The number value.
    var str;                    // The string value.
    var m;                      // Matching
    var result = [];            // An array to hold the results.

    var WHITES              = /\s+/g;
    var ID                  = /[a-zA-Z_]\w*/g;
    var NUM                 = /\d+(?:[eE.][+-]?\d+)?/g;
    var STRING              = /('(\\.|[^'])*'|"(\\.|[^"])*")/g; //con comillas simples o con comillas dobles
    var ONELINECOMMENT      = /[/][/].*/g;
    var MULTIPLELINECOMMENT = /[/][*](.|\n)*?[*][/]/g;
    var TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|[=<>][=<>]|&&|[|][|])/g;
    var ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]])/g;

    // Objeto tipo token
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function() {
      var str = m[0];
      i += str.length; // Warning! Efecto lateral en i
      return str;
     };
    
    // Empieza el parse, si no hay fuente no se devuelve nada.
    if (!this) return; 

    // Loop through this text
    while (i < this.length) {
        WHITES.lastIndex =  ID.lastIndex = NUM.lastIndex = STRING.lastIndex =
        ONELINECOMMENT.lastIndex = MULTIPLELINECOMMENT.lastIndex =
        ONECHAROPERATORS.lastIndex = TWOCHAROPERATORS.lastIndex = i;
        from = i;
        // Ignore whitespace and comments
        if (m = WHITES.bexec(this) || 
           (m = ONELINECOMMENT.bexec(this))  || 
           (m = MULTIPLELINECOMMENT.bexec(this))) { getTok(); }
        // name.
        else if (m = ID.bexec(this)) {
            result.push(make('name', getTok()));
        } 
        // number.
        else if (m = NUM.bexec(this)) {
            n = +getTok();

            if (isFinite(n)) {
                result.push(make('number', n));
            } else {
                make('number', m[0]).error("Bad number");
            }
        } 
        // string
        else if (m = STRING.bexec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
        } 
        // two char operator
        else if (m = TWOCHAROPERATORS.bexec(this)) {
            result.push(make('operator', getTok()));
        // single-character operator
        } else if (m = ONECHAROPERATORS.bexec(this)){
            result.push(make('operator', getTok()));
        } else {
          throw "Syntax error near '"+this.substr(i)+"'";
        }
    }
    return result;
};

