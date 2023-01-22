unit UstreamIO;

interface
uses System.Classes,System.SysUtils,System.StrUtils,
Winapi.Windows,uLkJSON,Vcl.Dialogs,Data.DBXJSON;
function getInput(InputStream:THandleStream):string;
procedure setOutput(jsoutput:TJSONObject;outputStream:THandleStream);
function getReplaceJSON(strjson:string):string;
implementation
function getInput(InputStream:THandleStream):String;
var red:Integer;
Buffer:AnsiString;
stroutput:String;
counter,remain:Integer;
sizemsg:Integer;
chunksize:Integer;
begin
chunksize:=1024*1024;
 stroutput:='';
if InputStream<>nil then
begin


SetLength(Buffer,4);
 counter:=0;
red:=InputStream.Read(Pointer(Buffer)^,4);
SetLength(Buffer,red);

     sizemsg:=InputStream.Size;
 if sizemsg>0 then
 begin

      while counter<sizemsg do
  begin
        SetLength(Buffer,chunksize);
      red:=InputStream.Read(Pointer(Buffer)^,chunkSize);
      SetLength(Buffer,red);
      counter:=counter+red;

      stroutput:=stroutput+buffer;

      remain:=sizemsg-counter;
      if (remain<chunksize) and(remain>0) then
      begin

        SetLength(Buffer,remain);
         red:=InputStream.Read(Pointer(Buffer)^,remain);

         SetLength(Buffer,red);
         stroutput:=stroutput+buffer;
         Break;
      end;
  end;
 end;



  end;



Result:=stroutput;

end;
function getReplaceJSON(strjson:string):string;
var output:string;
begin

output:=strjson;
  output:=AnsiReplaceStr(output,'\','\\');
 output:=AnsiReplaceStr(output,#9,'\t');
 output:=AnsiReplaceStr(output,#8,'\b');
 output:=AnsiReplaceStr(output,#12,'\f');
  output:=AnsiReplaceStr(output,#13,'\r');
 output:=AnsiReplaceStr(output,#10,'\n');
  result:=output;
end;

procedure setOutput(jsoutput:TJSONObject;outputStream:THandleStream);
var
output:AnsiString;
num,red,buf:Integer;
ms:TStringStream;
begin

 output:=jsoutput.ToString;

num:=Length(output);

red:=outputStream.Write(num,SizeOf(Integer));

 OutputStream.Write(Pointer(output)^,num);


end;
end.
