var dbgCode="\n.d2.mv:(value(1;))2; / magic value\n.d2.im:@[256#0;.d2.cm+.d2.cm1:11 26 96 120 128 160;:;@[.d2.cm:til each 7 6 24 8 32 96;2;reverse]]; / var/const index\n.d2.dm:@[256#3;.d2.cm+.d2.cm1;:;til 6]; / code category\n.d2.cnst:(();0;1;,;`;::;::;';/;\\;':;/:;\\:); / basic consts\n.d2.un:`::`flip`neg`first`reciprocal`where`reverse`null`group`hopen`hclose`string`enlist`count`floor`not`key`distinct`type`value`read0`read1`2::`avg`last`sum`prd`min`max`exit`getenv`abs; / unary fns\n.d2.bi:(`$(),/:\":+-*%&|^=<>$,#_~!?@.\"),`0:`1:`2:`in`within`like`bin`ss`insert`wsum`wavg`div; / binary fns\n.d2.ub:value each string .d2.un,.d2.bi;\n.d2.ns:`d2;\n.d2.nfr:` sv`,.d2.ns,`fr;\n\n/ code parse fns: code -> (stk pos;func;arg), return has 4 elements because of the global assign\n.d2.c:256#{(y+d<>1;(::;{x[1].d2.fr x 0};g;g:{.d2.fr . x};get;::)d;(.d2.cnst;y,.d2.cnst@7+;6,;5,;x 3;4_x)[d:.d2.dm k].d2.im k:z 0)}; / cnst0, .d2.adv, arg, loc, glob, const\n.d2.c[17]:{z;1_value {y}[y+1;::;]}; / magic value\n.d2.c[32+til 64]:{(y-b;{x . .d2.fr y}.d2.ub k-32;y-til 1+b:63<k:z 0)}; / unary/binary\n.d2.c[0]:{z;(y;{$[(::)~.d2.fr 3;.d2.fr[2 4]:(0;.d2.fr x);[k:.d2.fr x;.d2.fr::.d2.fr 3;.d2.bset[];.d2.fr[.d2.sTop::.d2.fr 4]:k]]};y;`ret)}; / return\n.d2.c[1]:{z;(y;{'.d2.fr x};y)}; / raise an exception\n.d2.c[2]:{z;(y-1;::;())}; / end of stm: ;\n.d2.c[3]:{(y;{.d2.gt 1;:.d2.fr[x;y]:.d2.fr z}[8-.d2.dm z;.d2.im z:96+z 1];y)}; / simple assign\n.d2.c[4]:{(y-1;({.[.d2.nfr;x:x,.d2.fr y 1;y 0;.d2.fr y 2];.d2.ass[.d2.fr;x]};{.[x;y:.d2.fr y 1;y 0;.d2.fr y 2];.d2.ass[x;y]})[d=2](6,;5,;x 3)[d:-2+.d2.dm k].d2.im k:z 1;(.d2.ub 32+z 2),y-0 1)}; / general assign\n.d2.c[5 6 7 8 9]:({(y-1;.d2.gt;z 1)};{(y-1;{.d2.gt$[.d2.fr y;1;x]}z 1;y)};{(y;{.d2.gt$[0<.d2.fr y;[.d2.fr[y]-:1;2];1+x]}z 2;y)}),2#{(y-8=z 0;.d2.gt;neg (8=z 0)+z 1)}; / goto forward/condit/do/bkward\n.d2.c[10 82 83]:{(y-a;{.d2.fr[4]:.d2.cc 0;if[x;.d2.gt 1];$[count k:.d2.empargs a:1_z:.d2.fr z;.d2.part[z 0;a;k];.[.d2.appf2;(y;z);{if[x&not 6=.d2.fr 2;.d2.gt -1];'y}[x]]]}[10=z 0;83=z 0];y-til 1+a:1^z 1)}; / applications\n\n/ helpers\n.d2.gt:{:.d2.fr[1]+:x}; / goto +N\n.d2.cc:{.d2.fr[0;.d2.fr 1] x}; / current bytecode\n.d2.ass:{.d2.gt 2;$[4=count .d2.fr[0;1+.d2.fr 1];::;$[y~();get x;x . y]]}; / assign + implicit return = null value\n.d2.excp:{@[{if[.d2.e; .d2.e-:1;.d2.fr::{$[(::)~y:y 3;'x;y]}[x]/[{6<>x 2};.d2.fr];.d2.fr[2]:5;.d2.sTop::.d2.fr 4;k:$[99<type g:.d2.fr .d2.sTop;.d2.app[{x y};(g;x)];g];.d2.gt 1;.d2.bset[];:k];'x};x;{.d2.fr[2 4]:(1;x)}]}; / handle exceptions\n.d2.spf:{(x~(@))|(x~(.))|(100=t)|(t:type x)within 104 111h}; / special function - worth interpreting in gen apply\n.d2.nargs:{k:value x;$[0=t:-100+type x;count k 1;t in 1 9;1;t in 2 3 10 11;2;t in 7 8;$[2=n:.d2.nargs k;1;n];t=4;.d2.nargsp k;t=5;.d2.nargs last k;t=6;.d2.nargs k;'\"not impl\"]}; / num of args\n.d2.nargsp:{(0|1+.d2.nargs[x 0]-count x)+count .d2.empargs x}; / required num of args for parted fn\n.d2.empargs:{k:();j:-1;do[count x;k,:104=type(1;x j+:1)];where k}; / idx of missing args\n.d2.part:{$[9>k:count y;x . y;(value \"{[x;y]x[\",(\";\"sv @[\"y \",/:string til k;z;:;(count z)#enlist\"\"]),\"]}\")[x;y]]}; / create parted fn\n.d2.tpart:{if[count b:(k:count j:.d2.empargs a:1_ g:value x)#y;a[j]:b];a:a,k _ y;$[104=type g 0;.z.s;.d2.app][g 0;a]}; / transform .d2.part fn into .d2.app form\n.d2.out:{(-1;::)[.z.w>0]};\n.d2.senv:{.d2.sT::.z.P;.d2.pc::0;if[.d2.fr 2;.d2.fr[2]:5]};\n\n/ .d2.app functions\n.d2.app:{.d2.apm[abs type x][x;y]}; / general .d2.app\n.d2.appf:{d:x~(.);if[(99<type y 0)&3=k:count y;.d2.fr[2]:6;:.d2.appf[x;2#y]];$[1=k;x . y;2=k;.d2.appf2[d;y];.d2.spf y 2;.d2.app[(.d2.appN 4&0|d+2*k-3);y];x . y]}; / @ and . : in exc blk mark the frame\n.d2.appf2:{if[x;if[(type y 1)within 0 98;:.d2.app . y];'`type];.d2.app[y 0;1_ y]}; / general .d2.app, x=1 - (.)[a;b]\n.d2.appN:({@[x;y;:;z each x y]};{.d2.appg[0;x;y;z;0]};{[a;j;g;k]@[a;j;:;g'[a j;k]]};{[a;j;g;k].d2.appg[1;a;j;g;k]};{'`rank}); / @ and .  3/4 args + default\n.d2.appg:{[ty;a;j;g;k]if[0=count j;j:(),(::)];{[ty;g;i2;a;i1;k]if[0=count i2;:.[a;(),i1;:;$[ty;g[;k];g] a .(),i1]];\n    if[(::)~j:i2 0;j:til count a . i1,(::)];if[not(t:type j)within 0 98h;:.z.s[ty;g;1_i2;a;i1,enlist j;k]];\n    .z.s[ty;g;1_i2]/[a;i1,/:$[98=t;enlist each j;j];k]}[ty;g;j;a;();k]};\n.d2.appq:{if[4>count y;:x . y];.d2.fr[4]:y;value[\"{[\",(\";\"sv string k 1),\"]\",$[count(k:value .d2.fr[6;0])2;\";\"sv string[k 2],'(\":\",n,\"[6]\"),/:string 1+til count k 2;\"\"],\";\",string[x],\"[\",(\";\"sv(n:string .d2.nfr),/:\"[4]\",/:string til count .d2.fr 4),\"]}\"]. -1_.d2.fr[5]}; / qsql, create env and exec fn\n/ .d2.app type map\n.d2.apf:(each;over;scan;prior);\n.d2.apm:128#(.); / default application\n.d2.apm[11]:{$[-11h=type x;$[\":\"=string[x]0;x . y;.d2.app[get x;y]];x . y]}; / redirect globals\n.d2.apm[100]:{$[count[y]<>count(k:value x)1;x . y;4>j:.d2.apf?x;.d2.app[.d2.cnst[7+j]y 0;1_y];.d2.na|(first k 3)in .d2.skpns;x . y;.d2.gif[x;y;.d2.fr]]}; / simple fn call\n.d2.apm[101 102]:{$[x in (@;.);.d2.appf[x;y];x in (!;?);.d2.appq[x;y];x~(enlist);y;x . y]}; / special forms/selects/other fns\n.d2.apm[104]:{$[.d2.nargsp x,y;x . y;.d2.tpart[x;y]]}; / parted fn\n.d2.apm[105]:{$[(count y)<.d2.nargs x;x . y;.d2.app[{x y . z};value[x],enlist y]]}; / composite fn\n.d2.apm[106+til 6]:{if[.d2.na|not[.d2.spf k]&$[100=type k:value x;(not k in .d2.apf)&(first value[k]3)in .d2.skpns;1b];:x . y];if[count[y]<.d2.nargs x;:x . y];.d2.app[.d2.adv t;(k;y;t:type[x]-106)]}; / adverbs\n/ adverbs\n.d2.adv:6#(::);\n.d2.adv[0]:{z;if[98=type y;:(cols y)!.z.s[x;value each y;0]];if[any g:99=t:type each y;if[not((3>count y)&all g)|all b~\\:k:distinct raze b:key each y w:where g;'`domain];y[w]:y[w]@\\:k;:k!.z.s[x;$[98=type y;value flip y;y];0]];\n  if[any t within 0 98h;y:flip y;j:-1;rr:(b:count y)#(::);do[b;rr[j]:x . y j+:1];:rr];x . y}; / each\n.d2.adv[1 2]:{p:({y};{x,enlist y})z=2;n:.d2.nargs x;k:count y;rr:();if[(k=1)&n=1;g:m:y 0;while[1;rr:p[rr;m];if[(g~m)|(m:x m)~m;:rr]]]; / iterate on val\n  if[(k=2)&n=1;rr:p[rr;m:y 1];$[-7=type a:y 0;do[a;rr:p[rr;m:x m]];while[a m;rr:p[rr;m:x m]]];:rr]; / iterate N/cond\n  if[any g:99=t:type each a:(k:k<>1)_y;if[not all kk[0]~/:kk:key each a w:where g;'`domain];$[98=type y;y:value each y;y[k+w]:value each a w];:$[z=2;![kk 0](),;::].z.s[x;y;z]]; / dict case\n  if[not k;$[1=k:count y:y 0;:first y;0=k;:();2=k;:p[y 0;x . y];[y:(y 0;1_ y);rr:p[rr;y 0]]]]; / adjust g[a] to g[a;b]\n  if[any t within 0 98h;m:y 0;y:flip 1_y;j:-1;if[(z=1)&0=k:count y;:m];do[k;rr:p[rr;m:x[m]. y j+:1]];:rr];x . y}; / scan/over\n.d2.adv[3]:{if[1=.d2.nargs x;:.d2.adv[0][x;y;0]];if[99=type m:last y;y:(-1_y),enlist value m;:(key m)!.z.s[x;y;z]]; / dict case\n  if[all not(type each y)within 0 98h;:$[1=count y;y 0;x . y]]; / atom case\n  y:enlist[$[1=count y;$[98=type y 0;0#m -1;m -1];y 0]],m;j:0;rr:(count m)#(::);do[count m;rr[j-1]:x[y j+:1;y j]];rr};\n.d2.adv[4 5]:{p:z=4;if[99=t:type y p;k:key y p;y[p]:value y p;:k!.z.s[x;y;z]];\n  if[not(t within 0 98h);:x . y];j:0;rr:(count y p)#(::);do[count y p;rr[j]:$[p;x[y 0;y[1;j]];x[y[0;j];y 1]];j+:1];rr}; / each right/left\n\n/ frame:\n/ (code;index;state;parent;exc/register;args;locals;id;stack....)\n.d2.fr:7#0; / prevent exc on a spurious run\n.d2.fs:(!). 2#2(,:)/(::); / processed fns\n.d2.gb:{count[z]#enlist .d2.c[z 0][x;y[0;0];z]}; / calculate fn code\n.d2.gc:{.[;(where k in 0x00020506070809;0);0 1!()]raze enlist[(),7].d2.gb[x]\\(where differ sums prev 0=0{$[x=0;0^0 0 0 1 2 1 1 2 1 1 1@y;x-1]}\\k)cut k-(k=9)&7=k til[count k]-next k:-1_x 0}; / process fn to get its code\n.d2.gf:{if[not(::)~g:.d2.fs x;:g];:.d2.fs[x]:(.d2.gc @[k;3;{$[`~first x;x;{$[y like \".*\";y;` sv`,x,y]}[x 0]each x]}];-1;5;::;::),(::;x,count[k 2]#enlist()),0,#[last (k:-1_value x)0;::]}; / get fn frame\n.d2.gif:{.d2.fr::@[.d2.gf x;3 5 7;:;(z;y,(::);1+z 7)];.d2.pc::();.d2.sTop::8;.d2.bset[]}; / get inited fn frame (set parent)\n\n.d2.tm:0D00:05; / timeout\n.d2.e:10000; / error count\n.d2.na:0b; / 1=native execution\n.d2.noDbg:1b; / do not stop in dbg funcs (adverbs and etc)\n.d2.skpns:`q`h`o`Q; / ignore this .d2.ns\n\n/ exec fns,  states: 0 - stopped; 1 - exception; 2 - brk point; 5 - running; 6 - exc block\n.d2.i0:{.d2.gif .$[100=type x;(x;(),y);({x . y};(x;(),y))],(::);.d2.gt 1}; / set initial frame\n.d2.ifn:{.d2.noDbg&.d2.ns=(value .d2.fr[6;0])[3;0]}; / int fn\n.d2.i:{.d2.i0[x;y];.d2.prs[]};\n.d2.s0:{if[.d2.fr 2;@[{if[.d2.tm<.z.P-.d2.sT;'\"Dbg timeout\"];j:.d2.fr 7;k:x[1]x 2;if[j=.d2.fr 7;.d2.fr[x 0]:k];if[(0<.d2.fr 1)&count x 0;.d2.sTop::x 0];if[.d2.gt[1]in .d2.cbps;.d2.fr[2]:2]};.d2.cc[];.d2.excp]]}; / run 1 instruction\n.d2.r:{.d2.i0[x;y];.d2.cont[]}; / run until stop/exc/brk\n.d2.s:{.d2.senv[];.d2.s0[];.d2.prs[]}; / one step\n.d2.cont:{.d2.senv[];{4<.d2.fr 2}.d2.s0/0;.d2.prs[]}; / continue\n.d2.l:{.d2.senv[];{(4<.d2.fr 2)&(.d2.pc::.d2.cc 0;.d2.ifn[]|not()~.d2.pc)1}.d2.s0/0;.d2.prs[]}; / next line\n.d2.nxt:{if[`ret~last .d2.cc[];:.d2.l[]];.d2.senv[];{y;(4<.d2.fr 2)&(.d2.pc::$[x=.d2.fr 7;.d2.cc 0;0];not(0<.d2.fr 1)&()~.d2.pc)1}[.d2.fr 7].d2.s0/0;if[.d2.ifn[];.d2.l[]];.d2.prs[]}; / next line over\n.d2.ef:{.d2.senv[];{y;(4<.d2.fr 2)&not (x=.d2.fr 7)&`ret~last .d2.cc[]}[.d2.fr 7].d2.s0/0;.d2.l[]}; / end function\n.d2.nexp:{.d2.senv[];.d2.s0[];{z;(4<.d2.fr 2)&(x<=.d2.fr 7)&not (x=.d2.fr 7)&.d2.fr[1]in y}[.d2.fr 7;value first each group .d2.txt0 .d2.fr[6;0]].d2.s0/0;if[.d2.ifn[];.d2.l[]];.d2.prs[]};\n/ stack/state\n.d2.trace:{{$[(::)~k:x 3;x;k]}/[$[x~(::);0;x];.d2.fr]};\n.d2.prs:{$[p:.d2.fr 2;.d2.out[]((\"\";\"Exception: \",.d2.fr 4;\"Breakpoint\";\"\";\"\";\"Running\") p;\"Top of the stack:\"),.d2.pstk[10],(\"Current line: \",m 0;\"Current exp: \",(m:.d2.txt .d2.fr)1);.d2.fr 4]}; / print state\n.d2.pstk:{reverse x sublist((\" .d2.fr[\",/:string[n],\\:\"]: \"),'.Q.s1 each .d2.fr n:.d2.sTop-til .d2.sTop-7),1_ \" Fn call(\",/:string[`anon^.d2.fmap g[;6;0]],'\"), line: \",/:last each .d2.txt each g:{x 3}\\[{not(::)~x 3};.d2.fr]}; / get N stack entries\n.d2.ps:{.d2.out[].d2.pstk $[x~(::);10;x]}; / print N stack entries\n.d2.pl:{.d2.out[]first .d2.txt .d2.trace x}; / print current line\n.d2.f:{.d2.out[]string .d2.trace[x][6;0]}; / print current function\n.d2.v:{(k[1]!-1_g 5),((k:value g[6;0])2)!1_(g:.d2.trace x)6};\n.d2.fmap:enlist[::]!enlist`;\n.d2.mfmap:{.d2.fmap::(!). flip raze{raze{$[99<type g:@[get;n:$[x~`;y;x:` sv `,x,y];0];enlist(g;n);99=type g;$[`~first key g;raze .z.s[x]each 1_key g;()];()]}[x]each key` sv`,x} each `,(key `)};\n\n/ breakpoints\n.d2.bps:enlist[::]!enlist(); / map for fns\n.d2.cbps:`long$(); / curr .d2.bps\n.d2.bset:{.d2.cbps::.d2.bps[.d2.fr[6;0];1]}; / set .d2.bps\n.d2.bfn:{$[any x~/:(`;(::));.d2.trace[0][6;0];100=type x;x;.d2.trace[x][6;0]]}; / get fn\n.d2.gbs:{id:-1+.d2.bps[x]0;update p:.[((-3#'\"  \",/:string[1+i]),'\":  \",/:p);(id;4);:;\"*\"]from((flip`p`c!((')[string x;key];{first each value x})@\\:g)where 0<first each key g:group .d2.txt0 x)}; / get all possible bs.\n.d2.pf:{.d2.out[](.d2.gbs .d2.bfn x)`p}; / print all bs.\n.d2.bs:{x:.d2.bfn x;$[count y;.d2.bps[x]:(y j;b j:where not null b:(.d2.gbs x)[-1+y:(),y;`c]);.d2.bps[x]:(();())];}; / set bps.\n.d2.ba:{.d2.bs[x;distinct .d2.bps[x:.d2.bfn x;0],y];}; /  add bps.\n.d2.bd:{.d2.bs[x;.d2.bps[x:.d2.bfn x;0] except y];}; / delete bps.\n.d2.bc:{.d2.bps::enlist[::]!enlist();}; / clear all bps.\n\n/ map from code to txt.\n.d2.tfs:(!). 2#2(,:)/(::); / processed fns\n.d2.taj:{rr:@[x;(-1+count x),where prev 0{$[x;0b;y in 0x05060809]}\\x:first value x;:;0x00];rr[where rr>=0x80]:0xa0;rr}; / adjust volatile code\n.d2.tfl:{$[\"[\"~y 1;x sv(0,1+y?\"]\")_y;\"{\",x,1_y]}; / insert fake locals\n.d2.tcmp:{$[(>).(j:count[x]-sum prds reverse[y]=count[y]#reverse x),k:sum prds y=count[y]#x;k+til j-k;0#0]}; / compare two preprocessed samples\n.d2.tfc:{(union). .d2.tcmp[.d2.taj x]each(2+2*count raze value[x]1 2)_/:.d2.taj each value each y}; / find code range\n.d2.tgm:{p&2>sums(0^(\"{}\"!1 -1)x)*p:not 0(1 0 0;0 2 1;1 1 1)\\\"\\\"\\\\\"?x}; / get mask, exclude {...} and \"...\"\n.d2.tlvl:{rr:prev[0;a]&a:sums y*0^(\"[()]\"!1 1 -1 -1)x;$[\"[\"~x 1;@[rr;til 1+x?\"]\";:;-1];rr]}; / get levels\n.d2.tspl:{(where 1<deltas[-2;j])_j:(where x<=y)except(0,-1+count y),where z&x=y}; / split by level\n.d2.tsmp:{.d2.tfl[(\":\"sv reverse string raze value[x]1 2),\":0; \"]each@[@[string x;y;:;\" \"];first y;:;]each\"01\"}; / prepare a pair of samples\n.d2.tget:{.d2.tmin[x]reverse{$[k:count rr:.[.d2.tfc;(x;.d2.tsmp[x;y]);()];rr!k#enlist .d2.ttrm[x;y];()!()]}[x]each raze .d2.tspl[;p;m&\";\"=g]each desc(distinct p:.d2.tlvl[g;m:.d2.tgm g:string x])except -1}; / get .d2.txt ids for all bytecode\n.d2.tmin:{rr:(til[k]!(k:count g:first w)#enlist til count last w:value x){x,inter'[(key y)#x;y]}/y;rr[j]:rr 0|-1+j:where g in \"x\"$til 10;rr}; / get the minimal .d2.txt range\n.d2.ttrm:{(neg sum prds reverse m)_(sum prds m:(string x)[y]in \" \\n\\t\\r\")_y}; / trim the .d2.txt ranges\n.d2.txt0:{if[(::)~.d2.tfs x; .d2.tfs[x]:.d2.tget x]; .d2.tfs[x]}; / return exp idx\n.d2.txt:{(trim p first where first[j]<sums 1+count each p:\"\\n\"vs p;(p:string x[6;0])j:.d2.txt0[x[6;0]]x 1)}; / cmd line version\n\n.d2.h:{.d2.out[]ssr[;\".d.\";\".\",string[.d2.ns],\".\"]each\n  (\"DEBUG commands:\";\n  \"START\";\n  \"  .d.r[func;args] or .d.r[monad;enlist arg] - runs fn with args until an exception or breakpoint\";\n  \"  .d.i[func;args] or .d.r[monad;enlist arg] - prepares environment but do not start execution\";\n  \"IN FUNCTION - EXEC\";\n  \"  .d.cont[] - continue execution\";\n  \"  .d.nxt[] - next line inside the current function (doesn't enter functions)\";\n  \"  .d.nexp[] - next expression (entity smaller than line, doesn't enter functions)\";\n  \"  .d.ef[] - finish the current function\";\n  \"  .d.l[] - next line (enters functions)\";\n  \"  .d.s[] - next step\";\n  \"IN FUNCTION - INFO\";\n  \"  .d.f[] or .d.f[N] - prints the current function or the function up N calls\";\n  \"  .d.v[] or .d.v[N] - prints the current vars or the vars in the function up N calls\";\n  \"  .d.ps[] or .d.ps[N] - prints top 10 or N stack entries\";\n  \"  .d.pl[] or .d.pl[N] - prints the current code line or the line in the function up N calls\";\n  \"BREAKPOINTS\";\n  \"  .d.pf[` or :: or N or {fn}] - shows the function with the breakpoint line numbers, .d2.bps are marked with *\";\n  \"  .d.ba[` or :: or N or {fn};line numbers] - add breakpoints to lines in the current/upper(+N)/specific function\";\n  \"  .d.bd[` or :: or N or {fn};line numbers] - delete breakpoints from lines in the current/upper(+N)/specific function\";\n  \"  .d.bs[` or :: or N or {fn};line numbers] - set breakpoints in the current/upper(+N)/specific function to these lines\";\n  \"  .d.bc[] - clear all breakpoints\";\n  \"USEFULL VARS\";\n  \"  .d.e - number of exceptions to pass into protected blocks (10000 by default). Set to 0 to always fail\";\n  \"  .d.tm - current dbg timeout, 0D00:05 by default\";\n  \"  .d.na - 0b by default, call all functions via dbg, 1b - native calls\";\n  \"  .d.noDbg - 1b by default, do not show internal dbg functions like adverbs when using .d.l and etc\";\n  \"  .d.skpns - list of system namespaces, all functions will be called natively\";\n  \"  .d.fr - current frame (see code comments)\")\n };\n.d2.intfns:({x y . z};{y};{x,enlist y};(value .d2.appg)[4]),raze .d2`adv`appg`appN`nargs;\n.d2.ifn:{.d2.noDbg&any .d2.fr[6;0]~/:.d2.intfns};"