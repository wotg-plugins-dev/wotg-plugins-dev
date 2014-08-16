new Wotg.Plugins.Simple({
    title  : 'SoundsOfHS',
    version: '0.2.3'
}, function (plugin, events) {
    events.add('initialize', function () {
        console.log('SoundsOfHS initialized');
    });

﻿   /*===============================================
    =            Подстроечные переменные            =
    ===============================================*/

    var modDefaultVolume = 0.25; // Громкость звуков мода (от 0 до 1)

    /*=======================================
    =            Подборка звуков            =
    =======================================*/


    var soundUrls = {
        /*==================================
        =            Начало боя            =
        ==================================*/
        USSR_start: [
            'http://k007.kiwi6.com/hotlink/f5l5ymglmy/spellsruRU0_00099.ogg',
            'http://k007.kiwi6.com/hotlink/9k381f3n26/soundsruRU0_00061.ogg',
            'http://k007.kiwi6.com/hotlink/fztcpy940t/spellsruRU0_00265.ogg',
            'http://k007.kiwi6.com/hotlink/2ve76g1kq6/spellsruRU0_00081.ogg',
            'http://k007.kiwi6.com/hotlink/vfc7q0y6qw/soundsruRU0_00238.ogg',
            'http://k007.kiwi6.com/hotlink/lc14142u8g/spellsruRU0_00360.ogg',
            'http://k007.kiwi6.com/hotlink/fc0ckf8hdx/spellsruRU0_00362.ogg',
            'http://k007.kiwi6.com/hotlink/9wuhynl0q5/spellsruRU0_00365.ogg',
            'http://k007.kiwi6.com/hotlink/dj00f1hagf/spellsruRU0_00584.ogg',
            'http://k007.kiwi6.com/hotlink/txwa1g49ho/spellsruRU0_00328.ogg',
            'http://k007.kiwi6.com/hotlink/1bpcraod57/spellsruRU0_00696.ogg',
        ],
        GERMANY_start: [
            'http://k007.kiwi6.com/hotlink/61y3tdqhl5/spellsruRU0_00372.ogg',
            'http://k007.kiwi6.com/hotlink/pziwsozv72/spellsruRU0_00168.ogg',
            'http://k007.kiwi6.com/hotlink/m53jss2vwd/spellsruRU0_00054.ogg',
            'http://k007.kiwi6.com/hotlink/pkgiyksihy/soundsruRU0_00125.ogg',
            'http://k007.kiwi6.com/hotlink/7obk46jtsv/spellsruRU0_00419.ogg',
            'http://k007.kiwi6.com/hotlink/hxqegolqly/spellsruRU0_00430.ogg',
            'http://k007.kiwi6.com/hotlink/9fhhqcynwo/spellsruRU0_00533.ogg',
            'http://k007.kiwi6.com/hotlink/igyy2v6vk1/spellsruRU0_00707.ogg',
        ],
        USA_start: [
            'http://k007.kiwi6.com/hotlink/e81faxc76o/soundsruRU0_00252.ogg',
            'http://k007.kiwi6.com/hotlink/mdt9tenow4/spellsruRU0_00546.ogg',
            'http://k007.kiwi6.com/hotlink/oyxy66yep6/soundsruRU0_00056.ogg',
            'http://k007.kiwi6.com/hotlink/fvvp3onzbn/spellsruRU0_00201.ogg',
            'http://k007.kiwi6.com/hotlink/6mk2ivfbaz/spellsruRU0_00579.ogg',
        ],

        /*==============================
        =            Победа            =
        ==============================*/
        USSR_victory: [
            'http://k007.kiwi6.com/hotlink/ghzysx3wzq/spellsruRU0_00071.ogg',
            'http://k007.kiwi6.com/hotlink/vs9qxo29vb/soundsruRU0_00216.ogg',
            'http://k007.kiwi6.com/hotlink/aasfpp1u1g/soundsruRU0_00197.ogg',
            'http://k007.kiwi6.com/hotlink/l0s4egj91v/soundsruRU0_00076.ogg',
        ],
        GERMANY_victory: [
            'http://k007.kiwi6.com/hotlink/ih4vy0u70q/soundsruRU0_00233.ogg',
            'http://k007.kiwi6.com/hotlink/ckp5eoktl9/spellsruRU0_00470.ogg',
            'http://k007.kiwi6.com/hotlink/ah3qk3o8dr/spellsruRU0_00424.ogg',
            'http://k007.kiwi6.com/hotlink/w6aad7p7zj/spellsruRU0_00435.ogg',
            'http://k007.kiwi6.com/hotlink/1mq4esfxq3/spellsruRU0_00441.ogg',
            'http://k007.kiwi6.com/hotlink/hvw24dfctk/spellsruRU0_00486.ogg',
            'http://k007.kiwi6.com/hotlink/l810gwjd3x/spellsruRU0_00686.ogg',
        ],
        USA_victory: [
            'http://k007.kiwi6.com/hotlink/x93hutz1mz/spellsruRU0_00215.ogg',
            'http://k007.kiwi6.com/hotlink/pjvmpiorut/spellsruRU0_00580.ogg',
            'http://k007.kiwi6.com/hotlink/wc1ezdh5st/soundsruRU0_00160.ogg',
            'http://k007.kiwi6.com/hotlink/9wc9x1watq/spellsruRU0_00072.ogg',
            'http://k007.kiwi6.com/hotlink/3cpye0arye/spellsruRU0_00110.ogg',

        ],

        /*=================================
        =            Поражение            =
        =================================*/
        USSR_defeat: [
            'http://k007.kiwi6.com/hotlink/rpxf3yhulw/spellsruRU0_00352.ogg',
            'http://k007.kiwi6.com/hotlink/d52khgem8w/soundsruRU0_00010.ogg',
            'http://k007.kiwi6.com/hotlink/3fqdfqdqbs/soundsruRU0_00176.ogg',
            'http://k007.kiwi6.com/hotlink/k4g1uckt3r/soundsruRU0_00099.ogg',
            'http://k007.kiwi6.com/hotlink/o5wzovd3x7/soundsruRU0_00016.ogg',
            'http://k007.kiwi6.com/hotlink/kgj5t15w60/spellsruRU0_00710.ogg',
        ],
        GERMANY_defeat: [
            'http://k007.kiwi6.com/hotlink/9v4vr4vogd/soundsruRU0_00263.ogg',
            'http://k007.kiwi6.com/hotlink/crzftcz5ns/spellsruRU0_00056.ogg',
            'http://k007.kiwi6.com/hotlink/jqcowrowmf/spellsruRU0_00596.ogg',
            'http://k007.kiwi6.com/hotlink/d5ctefd477/spellsruRU0_00659.ogg',
            'http://k007.kiwi6.com/hotlink/38ico1z19b/soundsruRU0_00052.ogg',
        ],
        USA_defeat: [
            'http://k007.kiwi6.com/hotlink/xhiwpzgk7c/spellsruRU0_00550.ogg',
            'http://k007.kiwi6.com/hotlink/zcq8x8zh7y/spellsruRU0_00590.ogg',
            'http://k007.kiwi6.com/hotlink/d7nyay8381/spellsruRU0_00735.ogg',
        ],

        /*=====================================================================
        =            Боевые события, кроме простого розыгрыша карт            =
        =====================================================================*/
        USSR_sv_btsv_die: [
            'http://k007.kiwi6.com/hotlink/kaj070kfv3/spellsruRU0_00340.ogg',
        ],
        USSR_reserve_gt_7: [
            'http://k007.kiwi6.com/hotlink/923pubaeq1/soundsruRU0_00183.ogg'
        ],
        GERMANY_gv_wespe_kill: [
            'http://k007.kiwi6.com/hotlink/t8l69irmc4/soundsruRU0_00148.ogg'
        ],
        GERMANY_uo_thismanisyoufriend_played_by_opponent: [
            'http://k007.kiwi6.com/hotlink/3rwd72mhy0/soundsruRU0_00161.ogg'
        ],
        GERMANY_gv_gwpanther_kill: [
            'http://k007.kiwi6.com/hotlink/z2hs72q7xl/spellsruRU0_00179.ogg'
        ],
        GERMANY_uo_thekeytothesituation_on_my_unit: [
            'http://k007.kiwi6.com/hotlink/b0pl0kcd7e/spellsruRU0_00628.ogg'
        ],
        USA_uv_m44_move_to_corner: [
            'http://k007.kiwi6.com/hotlink/zqyy5t35rc/soundsruRU0_00029.ogg'
        ],
        USA_draw_gt_1: [
            'http://k007.kiwi6.com/hotlink/woh2yttzv3/soundsruRU0_00221.ogg'
        ],
        USA_gv_maus_played_by_opponent: [
            'http://k007.kiwi6.com/hotlink/bhzo6902no/soundsruRU0_00272.ogg'
        ],
        USA_up_sniperplatoonofthe82division_and_uv_t32: [
            'http://k007.kiwi6.com/hotlink/d2u7pn6d6k/spellsruRU0_00466.ogg'
        ],


        /*=====================================
        =            Розыгрыш карт            =
        =====================================*/

        /*-----  USSR  ------*/
        USSR_so_nashedelopravoevragbudetrazbit: [
            'http://k007.kiwi6.com/hotlink/mp282q4st0/soundsruRU0_00031.ogg',
        ],
        USSR_sv_ob268: [
            'http://k007.kiwi6.com/hotlink/ijz28rwkug/soundsruRU0_00045.ogg',
            'http://k007.kiwi6.com/hotlink/p3tozy2dys/spellsruRU0_00333.ogg'
        ],
        USSR_sv_su14: [
            'http://k007.kiwi6.com/hotlink/wyjfvbauxw/soundsruRU0_00065.ogg',
        ],
        USSR_sv_isu152: [
            'http://k007.kiwi6.com/hotlink/p59sbqxpur/soundsruRU0_00088.ogg',
            'http://k007.kiwi6.com/hotlink/4evxva4gom/spellsruRU0_00633.ogg'
        ],
        USSR_sv_t44: [
            'http://k007.kiwi6.com/hotlink/kpi4s3btu0/soundsruRU0_00109.ogg',
        ],
        USSR_sv_kv1: [
            'http://k007.kiwi6.com/hotlink/178454hq9m/spellsruRU0_00009.ogg',
            'http://k007.kiwi6.com/hotlink/s0hny89485/spellsruRU0_00484.ogg'
        ],
        USSR_so_zamenim: [
            'http://k007.kiwi6.com/hotlink/fmqigtbaen/spellsruRU0_00011.ogg',
        ],
        USSR_sv_t3485: [
            'http://k007.kiwi6.com/hotlink/5ziusgvazh/spellsruRU0_00223.ogg',
            'http://k007.kiwi6.com/hotlink/7oazn9xtcb/spellsruRU0_00608.ogg',
            'http://k007.kiwi6.com/hotlink/3elgpzwtqs/spellsruRU0_00021.ogg'
        ],
        USSR_sv_bt2: [
            'http://k007.kiwi6.com/hotlink/3k4zkhy4dv/spellsruRU0_00025.ogg',
            'http://k007.kiwi6.com/hotlink/xsi72vhq4f/spellsruRU0_00523.ogg'

        ],
        USSR_sv_valentine2: [
            'http://k007.kiwi6.com/hotlink/fms2qn196g/spellsruRU0_00063.ogg',
        ],
        USSR_sv_t34: [
            'http://k007.kiwi6.com/hotlink/rj8bgz4alp/spellsruRU0_00230.ogg',
            'http://k007.kiwi6.com/hotlink/2zhetge8t6/spellsruRU0_00284.ogg',
            'http://k007.kiwi6.com/hotlink/rj8bgz4alp/spellsruRU0_00230.ogg',
            'http://k007.kiwi6.com/hotlink/2zhetge8t6/spellsruRU0_00284.ogg',
            'http://k007.kiwi6.com/hotlink/0ob85taljr/spellsruRU0_00543.ogg',
            'http://k007.kiwi6.com/hotlink/ki35wfsiiz/spellsruRU0_00177.ogg',
        ],
        USSR_so_budgeroem: [
            'http://k007.kiwi6.com/hotlink/fjkikl1xc8/spellsruRU0_00203.ogg',
        ],
        USSR_sv_su76: [
            'http://k007.kiwi6.com/hotlink/sii6cfi3az/spellsruRU0_00207.ogg',
        ],
        USSR_sv_btsv: [
            'http://k007.kiwi6.com/hotlink/wasv1l300h/spellsruRU0_00726.ogg',
            'http://k007.kiwi6.com/hotlink/qhplb4d5gb/spellsruRU0_00228.ogg'

        ],
        USSR_sv_t127: [
            'http://k007.kiwi6.com/hotlink/6hf58l0hhq/spellsruRU0_00250.ogg',
        ],
        USSR_sv_ms1: [
            'http://k007.kiwi6.com/hotlink/5d5yeevyba/spellsruRU0_00253.ogg',
        ],
        USSR_so_boltatvragupomogat: [
            'http://k007.kiwi6.com/hotlink/sxxq3tgrqe/spellsruRU0_00303.ogg',
        ],
        USSR_sv_is7: [
            'http://k007.kiwi6.com/hotlink/p5oaqa2jhj/spellsruRU0_00316.ogg',
        ],
        USSR_sv_ob704: [
            'http://k007.kiwi6.com/hotlink/zb4aebzf49/spellsruRU0_00357.ogg',
            'http://k007.kiwi6.com/hotlink/n4x31vixj3/spellsruRU0_00769.ogg'
        ],
        USSR_sv_kv1s: [
            'http://k007.kiwi6.com/hotlink/zjothekz8s/spellsruRU0_00363.ogg',
        ],
        USSR_sv_t26: [
            'http://k007.kiwi6.com/hotlink/95xljzw73w/spellsruRU0_00568.ogg',
        ],
        USSR_sv_t28: [
            'http://k007.kiwi6.com/hotlink/xjjz0n0u63/spellsruRU0_00661.ogg',
        ],
        USSR_sv_churchill3: [
            'http://k007.kiwi6.com/hotlink/txve6rvx96/spellsruRU0_00758.ogg',
        ],

        /*-----  GERMANY  ------*/
        GERMANY_gv_pzkpfwIIluchs: [
            'http://k007.kiwi6.com/hotlink/wxprkvnvdt/soundsruRU0_00023.ogg',
            'http://k007.kiwi6.com/hotlink/hkmvqomq9m/spellsruRU0_00451.ogg',
            'http://k007.kiwi6.com/hotlink/rcf7pub73a/spellsruRU0_00622.ogg'

        ],
        GERMANY_gv_jagdpze100: [
            'http://k007.kiwi6.com/hotlink/4wd1rjsrvz/spellsruRU0_00218.ogg',
            'http://k007.kiwi6.com/hotlink/9m6s6m0a4d/soundsruRU0_00032.ogg',
            'http://k007.kiwi6.com/hotlink/xc8d2v14oy/spellsruRU0_00334.ogg',
            'http://k007.kiwi6.com/hotlink/g3pas9q56h/spellsruRU0_00625.ogg'

        ],
        GERMANY_gv_pzkpfwVIbtigerII: [
            'http://k007.kiwi6.com/hotlink/8oez4c469f/soundsruRU0_00046.ogg',
        ],
        GERMANY_gv_pzkpfwII: [
            'http://k007.kiwi6.com/hotlink/xo4evd4npc/soundsruRU0_00064.ogg',
            'http://k007.kiwi6.com/hotlink/3tn2ear5f1/spellsruRU0_00642.ogg'

        ],
        GERMANY_gv_maus: [
            'http://k007.kiwi6.com/hotlink/z034zmbz3s/spellsruRU0_00634.ogg',
            'http://k007.kiwi6.com/hotlink/31512yrm7s/soundsruRU0_00156.ogg',
            'http://k007.kiwi6.com/hotlink/hlvmqy8qfg/spellsruRU0_00233.ogg',
            'http://k007.kiwi6.com/hotlink/j6jtqrurvu/spellsruRU0_00314.ogg',
            'http://k007.kiwi6.com/hotlink/7biutqdsvn/spellsruRU0_00610.ogg',
            'http://k007.kiwi6.com/hotlink/8uz181inh0/spellsruRU0_00678.ogg',
        ],
        GERMANY_gv_lowe: [
            'http://k007.kiwi6.com/hotlink/qyblljj8lh/soundsruRU0_00215.ogg',
            'http://k007.kiwi6.com/hotlink/82o3nhqutw/spellsruRU0_00524.ogg',
        ],
        GERMANY_gv_jagdtiger: [
            'http://k007.kiwi6.com/hotlink/q4dt1pop7l/soundsruRU0_00248.ogg',
        ],
        GERMANY_gv_pzkpfw5panther2: [
            'http://k007.kiwi6.com/hotlink/ub20e98w70/spellsruRU0_00007.ogg',
            'http://k007.kiwi6.com/hotlink/68m9txbob8/spellsruRU0_00490.ogg',
        ],
        GERMANY_gv_hummel: [
            'http://k007.kiwi6.com/hotlink/hcxol80ixf/spellsruRU0_00028.ogg',
        ],
        'GERMANY_gv_vk3002(db)': [
            'http://k007.kiwi6.com/hotlink/y39idtb0of/spellsruRU0_00236.ogg',
            'http://k007.kiwi6.com/hotlink/m5foofg012/spellsruRU0_00046.ogg',

        ],
        GERMANY_gv_ferdinand: [
            'http://k007.kiwi6.com/hotlink/g7sxwqtfwu/spellsruRU0_00094.ogg',
        ],
        GERMANY_gv_pzkpfws35739f: [
            'http://k007.kiwi6.com/hotlink/bwe422psmn/spellsruRU0_00097.ogg',
        ],
        GERMANY_gv_gwtiger: [
            'http://k007.kiwi6.com/hotlink/ldqn11vnqr/spellsruRU0_00125.ogg',
            'http://k007.kiwi6.com/hotlink/47vw54ob5e/spellsruRU0_00433.ogg',
            'http://k007.kiwi6.com/hotlink/9t9qegvnmh/spellsruRU0_00448.ogg',
        ],
        GERMANY_gv_grille: [
            'http://k007.kiwi6.com/hotlink/0883lawhg1/spellsruRU0_00137.ogg',
        ],
        GERMANY_go_flammenwerfervor: [
            'http://k007.kiwi6.com/hotlink/0jnl0h9ndn/spellsruRU0_00325.ogg',
            'http://k007.kiwi6.com/hotlink/513zwg081x/spellsruRU0_00576.ogg',
            'http://k007.kiwi6.com/hotlink/q9ctdv0hrl/spellsruRU0_00182.ogg',
            'http://k007.kiwi6.com/hotlink/ed33z0vbd9/spellsruRU0_00138.ogg',
        ],
        GERMANY_gv_gwpanther: [
            'http://k007.kiwi6.com/hotlink/y1yyj0xneo/spellsruRU0_00171.ogg',
        ],
        GERMANY_gv_pzkpfwVItiger: [
            'http://k007.kiwi6.com/hotlink/bw19pxpelt/spellsruRU0_00210.ogg',
        ],
        GERMANY_gv_gwtypee: [
            'http://k007.kiwi6.com/hotlink/5mg77xzk7m/spellsruRU0_00313.ogg',
        ],
        GERMANY_gv_hetzer: [
            'http://k007.kiwi6.com/hotlink/exr57psnrn/spellsruRU0_00480.ogg',
        ],
        GERMANY_go_arbeitedufuerdensieg: [
            'http://k007.kiwi6.com/hotlink/isuvyuu05e/spellsruRU0_00679.ogg',
        ],
        'GERMANY_gv_pzkpfw35(t)': [
            'http://k007.kiwi6.com/hotlink/if0b2i5uti/spellsruRU0_00759.ogg',
        ],

        /*-----  USA  ------*/

        USA_uv_m40slashm43: [
            'http://k007.kiwi6.com/hotlink/s2jkvhx3b2/soundsruRU0_00236.ogg',
            'http://k007.kiwi6.com/hotlink/y1kxbwnwh4/spellsruRU0_00344.ogg',
            'http://k007.kiwi6.com/hotlink/jupx71dm1d/spellsruRU0_00405.ogg',
        ],
        USA_uv_t82: [
            'http://k007.kiwi6.com/hotlink/erwjwktckd/soundsruRU0_00243.ogg',
            'http://k007.kiwi6.com/hotlink/br5e5xej1g/spellsruRU0_00263.ogg',
            'http://k007.kiwi6.com/hotlink/94svotwygc/spellsruRU0_00317.ogg',
        ],
        USA_uo_thismanisyoufriend: [
            'http://k007.kiwi6.com/hotlink/d5ewuwmiky/soundsruRU0_00247.ogg',
            'http://k007.kiwi6.com/hotlink/xyum8g9r7f/spellsruRU0_00681.ogg',
            'http://k007.kiwi6.com/hotlink/as1dabifk0/spellsruRU0_00221.ogg',
            'http://k007.kiwi6.com/hotlink/w57ctk20f0/spellsruRU0_00039.ogg',
        ],
        USA_uo_letemallcome: [
            'http://k007.kiwi6.com/hotlink/ufziwqocjh/spellsruRU0_00001.ogg',
            'http://k007.kiwi6.com/hotlink/h5j9dcffm3/spellsruRU0_00456.ogg',
        ],
        USA_uo_enlistinthewaves: [
            'http://k007.kiwi6.com/hotlink/3fi66cr2xf/spellsruRU0_00033.ogg',
            'http://k007.kiwi6.com/hotlink/v1g1ic4q59/spellsruRU0_00494.ogg',
        ],
        USA_uv_m3stuart: [
            'http://k007.kiwi6.com/hotlink/wtkghu0q5d/spellsruRU0_00067.ogg',
        ],
        USA_uv_m36slugger: [
            'http://k007.kiwi6.com/hotlink/5az4879xj5/spellsruRU0_00070.ogg',
        ],
        USA_uv_t92: [
            'http://k007.kiwi6.com/hotlink/mc5551sacn/spellsruRU0_00080.ogg',
            'http://k007.kiwi6.com/hotlink/14bnldzz3i/spellsruRU0_00324.ogg',
            'http://k007.kiwi6.com/hotlink/3cdqnmlfby/spellsruRU0_00355.ogg',
        ],
        USA_uv_t57: [
            'http://k007.kiwi6.com/hotlink/37x5n6wcry/spellsruRU0_00153.ogg',
        ],
        USA_uo_anappealtoyou: [
            'http://k007.kiwi6.com/hotlink/lok3afam3u/spellsruRU0_00160.ogg',
        ],
        USA_uo_avengedecember7: [
            'http://k007.kiwi6.com/hotlink/4kiw88nb5d/spellsruRU0_00185.ogg',
        ],
        USA_uv_m46patton: [
            'http://k007.kiwi6.com/hotlink/9smjwv7hl3/spellsruRU0_00341.ogg',
            'http://k007.kiwi6.com/hotlink/h99wwi0c13/spellsruRU0_00217.ogg',
            'http://k007.kiwi6.com/hotlink/52qgwz8ihr/spellsruRU0_00709.ogg',
            'http://k007.kiwi6.com/hotlink/3eddlvqwqi/spellsruRU0_00762.ogg',
        ],
        USA_up_mortarsof17division: [
            'http://k007.kiwi6.com/hotlink/yy5gy7y9jh/spellsruRU0_00266.ogg',
        ],
        USA_uv_m7priest: [
            'http://k007.kiwi6.com/hotlink/jx2iw1pu4h/spellsruRU0_00282.ogg',
        ],
        USA_uv_m22locust: [
            'http://k007.kiwi6.com/hotlink/l1dzi8zec3/spellsruRU0_00295.ogg',
        ],
        USA_uo_imcountingonyou: [
            'http://k007.kiwi6.com/hotlink/45hppguc1n/spellsruRU0_00301.ogg',
        ],
        USA_uo_thekeytothesituation: [
            'http://k007.kiwi6.com/hotlink/a8qc01tkg8/spellsruRU0_00366.ogg',
        ],
        USA_uv_t28prot: [
            'http://k007.kiwi6.com/hotlink/ietqfscq9i/spellsruRU0_00694.ogg',
        ],
        USA_uo_backthemwithmoremetal: [
            'http://k007.kiwi6.com/hotlink/diwooftbwa/spellsruRU0_00510.ogg',
        ],
        USA_uo_freedomshallprevail: [
            'http://k007.kiwi6.com/hotlink/e141wz64l2/spellsruRU0_00467.ogg',
        ],
        USA_up_sniperplatoonofthe82division: [
            'http://k007.kiwi6.com/hotlink/bu7mg2htkf/spellsruRU0_00601.ogg',
            'http://k007.kiwi6.com/hotlink/62moe73q67/spellsruRU0_00555.ogg',
            'http://k007.kiwi6.com/hotlink/5k30a7tcnt/spellsruRU0_00504.ogg',
        ],
        USA_uv_t1heavy: [
            'http://k007.kiwi6.com/hotlink/xd6xhic61u/spellsruRU0_00605.ogg',
        ],
        USA_uv_t14: [
            'http://k007.kiwi6.com/hotlink/ijzmanh7lb/spellsruRU0_00611.ogg',
        ],
        USA_uv_m44: [
            'http://k007.kiwi6.com/hotlink/1mz64o5hvw/spellsruRU0_00715.ogg',
        ],
        USA_uv_m6: [
            'http://k007.kiwi6.com/hotlink/vmj3v0hw0x/spellsruRU0_00751.ogg',
        ],
    };

    /*============================================================
    =            Вспомогательные переменные и функции            =
    ============================================================*/

    var everythingBuffered = false;
    var htmlAudio = {}; // Объект элементов <audio>
    var nations = {}; // Нации сошедшихся в дуэли игроков

    function hear(trigger) {
        if (!soundUrls[trigger]) {
            // console.info(trigger);
            return;
        }
        var len = soundUrls[trigger].length;
        if (!len) return;
        // console.info('Sound of ' + trigger);
        var idx = Math.floor(Math.random() * len);

        htmlAudio[trigger][idx].play();
    }

    function countBuffered() {
        var buffered = 0;
        var unbuffered = 0;
        for (var trigger in soundUrls) {
            var len = soundUrls[trigger].length;

            for (var i = 0; i < len; i++) {
                if (htmlAudio[trigger][i].buffered.length) {
                    buffered++;
                } else if (htmlAudio[trigger][i]) {
                    unbuffered++;
                }
            }
        }
        if (!unbuffered) everythingBuffered = true;
        console.info('Sounds buffered: ' + Math.round(buffered / (buffered + unbuffered) * 100) + '%');
    }

    function rebuffer() {
        for (var trigger in soundUrls) {
            var len = soundUrls[trigger].length;
            for (var i = 0; i < len; i++) {
                if (!htmlAudio[trigger][i] || htmlAudio[trigger][i].buffered.length) continue;
                htmlAudio[trigger][i].load();
            }
        }
    }

    function findPropertyBeginningWith(beginStr) {
        for (var key in soundUrls) {
            if (key.indexOf(beginStr) === 0) {
                return key;
            }
        }
        return undefined;
    }

    function isThere(protoid, pno) {
        var cards = Wotg.battle().cards.list;
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if ((card.props.location === 'BATTLEFIELD' || card.props.location === 'SUPPORT') && card.owner.playerno === pno && card.proto.id === protoid) return true;
        }
        return false;
    }

    /*===============================================
    =            Парсинг сложных условий            =
    ===============================================*/

    var complexConditions = {}; // Сложные условия, содержащие числа и др. информацию
    var nationsList = ['USSR_', 'GERMANY_', 'USA_'];
    var propsList = ['reserve_gt_', 'draw_gt_'];

    for (var natno = 0; natno < nationsList.length; natno++) {
        for (var propno = 0; propno < propsList.length; propno++) {
            var beginningStr = nationsList[natno] + propsList[propno];
            var propertyName = findPropertyBeginningWith(beginningStr);

            if (!propertyName) continue;

            complexConditions[beginningStr] = {};
            complexConditions[beginningStr].name = propertyName;
            complexConditions[beginningStr].value = +propertyName.slice(beginningStr.length);
        }
    }

    /*===========================================
    =            Инициализация аудио            =
    ===========================================*/

    api.events.add('beforeLaunch', function() {

        for (var trigger in soundUrls) {
            if (!soundUrls[trigger]) continue;
            var numOfSounds = soundUrls[trigger].length;
            htmlAudio[trigger] = [];

            for (var i = 0; i < numOfSounds; i++) {
                var currentAudio = htmlAudio[trigger][i] = new Audio();
                currentAudio.src = soundUrls[trigger][i];
                currentAudio.preload = 'auto';
                currentAudio.volume = modDefaultVolume;
                // currentAudio.playbackRate = 0.5;
            }
        }

        /*========================================================
        =            Дозагрузка звуков каждые 10 сек.            =
        ========================================================*/

        var timer = setInterval(function() {
            if (everythingBuffered) {
                clearInterval(timer);
                return;
            }
            countBuffered();
            rebuffer();
        }, 10 * 1000);

    });


    /*=========================================
    =            Обработка событий            =
    =========================================*/

    api.events.add('afterLaunch', function() {

        // Инициализация наций
        Wotg.controller().screens.events.add('change', function(screen) {
            // Когда будет озвучка экранов, отличных от боевого, эту часть надо будет переделать
            if (screen.name !== 'Battle') return;
            var battle = Wotg.battle();

            nations[battle.player.playerno] = battle.player.country + '_';
            nations[battle.opponent.playerno] = battle.opponent.country + '_';

        });

        // Начало боя
        Wotg.controller().connection.events.add('message/game/start', function(message) {
            hear(message.player.country + '_start');

        });

        // Конец боя
        Wotg.controller().connection.events.add('message/game/results', function(message) {
            if (message.player.playerno === message.winnerno) {
                hear(message.player.country + '_victory');
            } else {
                hear(message.player.country + '_defeat');
            }

        });

        // Действия во время боя
        Wotg.controller().connection.events.add('message/game/stackresolved', function(message) {
            var duelist, duelistno;

            for (var i = 0; i < message.activities.length; i++) {

                var activity = message.activities[i];
                var target = activity.target;
                var card = activity.card;
                var pno = message.player.playerno;

                // Разыгрывание карт
                if (['l_vehicle_played', 'l_platoon_played', 'l_order_played', 'l_order_no_target_played'].indexOf(activity.logid) !== -1) {

                    // Комбинация
                    if (card.playerno === pno && nations[pno] === 'USA_') {
                        if ((card.proto === 'up_sniperplatoonofthe82division' && isThere('uv_t32', card.playerno)) ||
                            (card.proto === 'uv_t32' && isThere('up_sniperplatoonofthe82division', card.playerno))) {
                            hear('USA_up_sniperplatoonofthe82division_and_uv_t32');
                            break;
                        }

                    }

                    // Розыгрыш противником
                    if (card.proto === 'uo_thismanisyoufriend' && card.playerno === message.opponent.playerno && nations[pno] === 'GERMANY_') {
                        hear('GERMANY_uo_thismanisyoufriend_played_by_opponent');
                        break;
                    }
                    if (card.proto === 'gv_maus' && card.playerno === message.opponent.playerno && nations[pno] === 'USA_') {
                        hear('USA_gv_maus_played_by_opponent');
                        break;
                    }

                    // Нация разыгравшего штаба + id карты
                    hear(nations[card.playerno] + card.proto);

                    // Ключ на свою технику
                    if (card.proto === 'uo_thekeytothesituation' && card.playerno === pno && target.playerno === card.playerno) {
                        hear(nations[card.playerno] + card.proto + '_on_my_unit');
                    }
                }

                // Возвращение карт в руку и дров. Проверка перебора карт у игрока
                if (['l_player_draw_card', 'l_unsummon_card'].indexOf(activity.logid) !== -1) {

                    var reserveGt = complexConditions[nations[pno] + 'reserve_gt_'];
                    if (reserveGt && message.player.reserve > reserveGt.value) hear(reserveGt.name);

                }

                // Кто-то умер
                if (activity.logid === 'l_unit_died') {

                    // Умер мой юнит
                    if (nations[card.playerno] === pno) {
                        hear(nations[card.playerno] + card.proto + '_die');
                    }

                    // Причины смерти:
                    for (var j = 0; j < message.activities.length; j++) {
                        var otherActivity = message.activities[j];
                        var killer = otherActivity.card;
                        // после атаки моего юнита (впринципе мой юнит сам мог убиться об контратаку, но поскольку озвучка есть только у арты, это не столь важно)
                        if (otherActivity.logid === 'l_vehicle_attacked' && killer.playerno === pno) {
                            hear(nations[killer.playerno] + killer.proto + '_kill');
                        }
                    }
                }

                // Движение юнита
                if (activity.logid === 'l_vehicle_moved' && card.playerno === pno) {

                    // В угол
                    if (activity.value.x === 0 && activity.value.y === 2) {
                        hear(nations[card.playerno] + card.proto + '_move_to_corner');
                    }
                }
            }

        });

        // Действие абилок
        Wotg.controller().connection.events.add('message/game/abilityresolved', function(message) {

            for (var i = 0; i < message.activities.length; i++) {

                var activity = message.activities[i];

                if (activity.logid === 'l_player_draw_card' && activity.card.playerno === message.player.playerno) {

                    var drawGt = complexConditions[nations[activity.card.playerno] + 'draw_gt_'];
                    if (drawGt && activity.value > drawGt.value) hear(drawGt.name);

                    // Дров абилкой (например 60-й танковой). Проверка перебора карт у игрока

                    var reserveGt = complexConditions[nations[activity.card.playerno] + 'reserve_gt_'];
                    if (reserveGt && message.player.reserve > reserveGt.value) hear(reserveGt.name);
                }
            }

        });

        // Использование расходников
        Wotg.controller().connection.events.add('message/consumables/use', function(message) {

            var playerno = message.player.playerno;
            for (i = 0; i < message.activities.length; i++) {
                var activity = message.activities[i];

                // Разыгрывание расходников
                if (activity.logid === 'l_consumable_exhausted') {
                    hear(activity.card.proto.slice(0, -1)); // безотносительно к уровню расходника
                }
            }

        });

        // Переход хода
        Wotg.controller().connection.events.add('message/game/turnbegin', function(message) {
            // Дров в начале хода. Проверка перебора карт у дуэлянтов
            for (var duelistno in [0, 1]) {
                var duelist = [message.player, message.opponent][duelistno];

                var reserveGt = complexConditions[nations[duelist.playerno] + 'reserve_gt_'];
                if (reserveGt && duelist.reserve > reserveGt.value) hear(reserveGt.name);
            }
        });

    });
});