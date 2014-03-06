require 'sinatra'

set :public_folder, File.dirname(__FILE__)

get '/' do
  erb :index
end

__END__

@@ index
  <h1> Visit <a href="/ajax.html">withajax.html</a> example</h1>
  <h1> Visit <a href="/get.html">withget.html</a> example</h1>
@@layout
  <!DOCTYPE HTML>
  <html lang="en">
  <head>
   <title>Top Down Operator Precedence</title>
   <link href="global.css" rel="stylesheet" type="text/css">
   <script src="parse.js"></script>
   <script src="tokens.js"></script>
   <script src="main.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  </head>
  <body>
    <%= yield %>
  </body>
  </html>
@@Margarita
  <script>
      function  dump(fileName) {
          $.ajax({
            url : fileName,
            dataType: "text",
            success : function (data) {
                $("#original").val(data);
            }
        });
      }
    </script> 
    
  <h1>Lexical Analysis</h1>
  <h2>Demonstration</h2>
  
  <div style="width:70%;margin:auto;">  
    <textarea autofocus cols = "80" rows = "5" id="original">
     var a = "hello"; // initialize a
     var b = function(x) {
             var c = 3;
               return x+c;
             };
    </textarea>
  </div>
  <br>
  <div style="display:inline">
        <button id ="input2" type="button" onclick="dump('input2.txt');">input2</button>
        <button id ="input"  type="button" onclick="dump('input.txt');">input</button>
	<input id="PARSE" value=parse type=button>
  </div>
  <pre id="OUTPUT"></pre>