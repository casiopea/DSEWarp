%nodemGTM	;
	; GT.M EWD Lite & NodeM Utility 2013/07/23 13:12
	;
	; Written by Kiyoshi Sawada <casiopea.tpine@gmail.com>
	; Copyright c 2013 Japan DynaSystems Inc.
	; 
	; This program is free software: you can redistribute it and/or modify
	; it under the terms of the GNU Affero General Public License (AGPL)
	; as published by the Free Software Foundation, either version 3 of
	; the License, or (at your option) any later version.
	; 
	; This program is distributed in the hope that it will be useful,
	; but WITHOUT ANY WARRANTY; without even the implied warranty of
	; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	; GNU Affero General Public License for more details.
	;
	; You should have received a copy of the GNU Affero General Public 
	; License along with this program. 
	; If not, see http://www.gnu.org/licenses/.
	; ------------------------------------------------------------------
	; w $$DSEWRAPjson^%nodemGTM ,  zlink "_nodemGTM.m"
	q
	;--------------------------------------------------------------------
DSEWRAPjson()	;
	; DSE dump, database file header to JSON object
	; Useing $$arrayToJSON^%zewdJSON by EWD GT.M routine
	; output JSON ex.
	;  [{"DEFAULT":0,"FIELD_NAME":"Abandoned Kills","TEMP":0}, .... ]
	;
	n dse,reg,fn,fn2,data,i,field,result
	d dump^%DSEWRAP("*",.dse,"","all")
	s reg=""
	f  s reg=$o(dse(reg)) q:reg=""  d
	. s fn=""
	. f  s fn=$o(dse(reg,fn)) q:fn=""  d
	. . s field(fn)=""
	. . s fn2=""
	. . f  s fn2=$o(dse(reg,fn,fn2)) q:fn2=""  d
	. . . s field(fn,fn2)=""
	;
	s fn=""
	f i=1:1 s fn=$o(field(fn)) q:fn=""  d
	. s result(i,"FIELD_NAME")=fn
	. s reg=""
	. f  s reg=$o(dse(reg)) q:reg=""  d
	. . s result(i,reg)=$g(dse(reg,fn))
	. s fn2=""
	. f  s fn2=$o(field(fn,fn2)) q:fn2=""  d
	. . s i=$i(i),result(i,"FIELD_NAME")=fn_"_"_fn2
	. . s reg=""
	. . f  s reg=$o(dse(reg)) q:reg=""  d
	. . . s result(i,reg)=$g(dse(reg,fn,fn2))
	q $$arrayToJSON^%zewdJSON("result")
	; Note : not $ETRAP handler
	;
DSEregion()	; w $$DSEregion^%nodemGTM
	; Region List
	; Useing $VIEW("GVNEXT")
	; output JSON ex.   ["DEFAULT","TEMP"]
	n GV
	s GV="" f i=1:1 s GV=$VIEW("GVNEXT",GV) q:GV=""  s GV(i)=GV
	q $$arrayToJSON^%zewdJSON("GV")
	;
