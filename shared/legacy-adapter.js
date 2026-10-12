/* 旧 WMS 只读查询适配层。页面只用演示数据。
   桩客户端只实现白名单内的 GET/QUERY，限速每秒 1 次，不发网络请求，页面也不会调用它。 */
(function () {
  const SOURCE = 'mock';
  const NODES = ['订单审核','ISF 申报','财务开票','转关到港','提柜完成','到仓拆柜','转装出仓','清关过境','派送签收','催款回款'];
  const ROLES = [
    {id:'isf', title:'ISF岗', name:'陈静', sec:'ISF申报'},
    {id:'tr', title:'转关提柜岗', name:'赵磊', sec:'转关申报'},
    {id:'wh', title:'仓库', name:'刘洋', sec:'仓库操作'},
    {id:'dl', title:'清关派送岗', name:'Maria', sec:'清关派送'}
  ];
  const FIELDS = [
    {k:'consignee', l:'CONSIGNEE', sec:'isf'},
    {k:'recisf', l:'Rec-ISF Doc', sec:'isf', gate:1},
    {k:'isdone', l:'ISF完成', sec:'isf', gate:1},
    {k:'isno', l:'ISF回执单号', sec:'isf'},
    {k:'isco', l:'ISF申报公司', sec:'isf', gate:1},
    {k:'isdate', l:'ISF回执日期', sec:'isf'},
    {k:'isfile', l:'ISF回执文件', sec:'isf', gate:1},
    {k:'recvdoc', l:'Receive Doc', sec:'isf'},
    {k:'sendte', l:'Send T&E DOC', sec:'isf'},
    {k:'laemail', l:'LA出仓邮件', sec:'isf'},
    {k:'ordnote', l:'订单备注', sec:'isf'},
    {k:'arr', l:'Arrival Date', sec:'tr', gate:1},
    {k:'term', l:'码头', sec:'tr', gate:1},
    {k:'an', l:'A/N 到货通知', sec:'tr', gate:1},
    {k:'ted', l:'转关日期', sec:'tr'},
    {k:'teclose', l:'TE关闭日期', sec:'tr'},
    {k:'teno', l:'T&E号码', sec:'tr'},
    {k:'teco', l:'转关公司', sec:'tr'},
    {k:'tmode', l:'运输方式', sec:'tr'},
    {k:'box', l:'货柜状态', sec:'tr'},
    {k:'av', l:'可提柜日期', sec:'tr', gate:1},
    {k:'plan', l:'预计提柜时间', sec:'tr', gate:1},
    {k:'lfd', l:'货柜LFD', sec:'tr', gate:1},
    {k:'pkdone', l:'提柜完成', sec:'tr', gate:1},
    {k:'pkco', l:'提柜公司', sec:'tr'},
    {k:'destwh', l:'目的仓库', sec:'tr'},
    {k:'nostack', l:'不码柜', sec:'tr'},
    {k:'shorttruck', l:'短驳卡车公司', sec:'tr'},
    {k:'rtn', l:'还柜完成', sec:'tr'},
    {k:'trnote', l:'备注', sec:'tr'},
    {k:'trfile', l:'文件上传', sec:'tr'},
    {k:'wh', l:'操作仓库', sec:'wh'},
    {k:'indate', l:'入仓日期', sec:'wh', gate:1},
    {k:'hold', l:'拦截指令', sec:'wh'},
    {k:'holdgo', l:'启动仓库拦截', sec:'wh'},
    {k:'devand', l:'拆柜日期', sec:'wh', gate:1},
    {k:'devqty', l:'拆柜数量(托/件)', sec:'wh'},
    {k:'shortover', l:'少/多(件)', sec:'wh'},
    {k:'devco', l:'拆柜公司', sec:'wh'},
    {k:'dv', l:"53'DV#", sec:'wh'},
    {k:'trarr', l:'Trailer到达', sec:'wh', gate:1},
    {k:'loadqty', l:'装柜数量(托/件)', sec:'wh'},
    {k:'loadco', l:'装柜公司', sec:'wh'},
    {k:'split', l:'[分]拆分数据', sec:'wh'},
    {k:'merge', l:'[合]并入数据', sec:'wh'},
    {k:'loadd', l:'装柜日期', sec:'wh', gate:1},
    {k:'outd', l:'出仓日期', sec:'wh', gate:1},
    {k:'gps', l:'GPS设备', sec:'wh'},
    {k:'trtrans', l:'Trailer转运', sec:'wh'},
    {k:'mode', l:'实际运输方式', sec:'wh'},
    {k:'seal', l:'seal号码', sec:'wh'},
    {k:'cd', l:'清关完成', sec:'dl', gate:1},
    {k:'cval', l:'清关货值', sec:'dl'},
    {k:'decl', l:'报关单号', sec:'dl'},
    {k:'raild', l:'配车厢日期', sec:'dl', gate:1},
    {k:'xbco', l:'过境申报公司', sec:'dl'},
    {k:'xbwh', l:'过境操作仓库', sec:'dl'},
    {k:'xd', l:'过境日期', sec:'dl', gate:1},
    {k:'carno', l:'派送车厢号', sec:'dl', gate:1},
    {k:'seal2', l:'转运封条号码', sec:'dl', gate:1},
    {k:'lock', l:'加强锁号', sec:'dl', gate:1},
    {k:'car', l:'派送公司', sec:'dl'},
    {k:'depart', l:'发车时间', sec:'dl', gate:1},
    {k:'extra', l:'多拍', sec:'dl'},
    {k:'s1', l:'1st暂存仓/分拨', sec:'dl'},
    {k:'s1a', l:'1st开始', sec:'dl'},
    {k:'s1b', l:'1st截止', sec:'dl'},
    {k:'s2', l:'2nd暂存仓/主拨', sec:'dl'},
    {k:'s2a', l:'2nd开始', sec:'dl'},
    {k:'s2b', l:'2nd截止', sec:'dl'},
    {k:'etacdmex', l:'ETACDMEX', sec:'dl', gate:1},
    {k:'trucknt', l:'卡车通知可派', sec:'dl', gate:1},
    {k:'pdel', l:'预计派送', sec:'dl', gate:1}
  ];
  const ALLOW = [
    '/wms/order/queryPage',
    '/wms/order/queryList',
    '/wms/order/filterFields',
    '/wms/order/columnValues',
    '/wms/order/queryArchivedPage',
    '/wms/order/queryPageWarehouse',
    '/wms/order/queryPageWorkbench',
    '/wms/order/getWaitStatus',
    '/wms/order/getWaitStatusWarehouse',
    '/wms/order/getWaitStatusWorkbench',
    '/wms/order/getWorkBenchWaitStatus',
    '/wms/order/workbench/total-count',
    '/wms/order/warehouse/filterFields',
    '/wms/order/warehouse/columnValues',
    '/wms/order/file/cipl/get/',
    '/wms/stateMaintenance/get/',
    '/wms/stateMaintenance/getWarehouse/',
    '/wms/stateMaintenance/orderContainerSelect',
    '/wms/stateMaintenanceStatus/get/',
    '/wms/stateMaintenanceStatus/branches/',
    '/wms/clearanceDelivery/get/',
    '/wms/customsTransferContainer/get/',
    '/wms/isfDeclaration/get/',
    '/wms/warehouseOperation/get/',
    '/wms/exceptionItem/queryPage',
    '/wms/exceptionFee/queryPage',
    '/inventory/inbound/stripping/pool',
    '/inventory/inbound/record/queryPage',
    '/inventory/inbound/record/detail',
    '/inventory/inbound/record/filterFields',
    '/inventory/inbound/record/columnValues',
    '/inventory/inbound/stats',
    '/inventory/outPlan/queryPage',
    '/inventory/outPlan/pool',
    '/inventory/outPlan/stats',
    '/inventory/outPlan/querySourceStock',
    '/inventory/outPlan/filterFields',
    '/inventory/outPlan/columnValues',
    '/wms/customer/queryPage',
    '/wms/customer/get/',
    '/wms/customer/getCustomerAffiliation',
    '/wms/customer/listSalesEmployees',
    '/wms/supplier/queryPage',
    '/wms/supplier/queryList',
    '/wms/supplier/queryListByType',
    '/wms/supplier/filterFields',
    '/wms/supplier/columnValues',
    '/branch/order/queryPage',
    '/branch/order/queryPageWarehouse',
    '/branch/order/getWaitStatus',
    '/branch/order/stateMaintenanceStatus/get/',
    '/crm/workbench/todo'
  ];
  const WRITE = /\/(addDraft|add|update\w*|delete\w*|submit|review\w*|close|archive\w*|unarchive|send\w*|upload|invalid|batch\w*|cancel|import\w*|login|logout|bind\w*|unbind\w*|deduct|register\w*|backfill|fix\w*|disable\w*|enable\w*|create)(\/|$)/i;
  const POOL = [
    {id:'TEST1122334', status:'拆柜中', wh:'DEMO-仓-LA1', dock:'月台-DEMO-2'},
    {id:'TEST1357913', status:'已拆', wh:'DEMO-仓-LA1', dock:'月台-DEMO-1'},
    {id:'TEST8899001', status:'待进仓', wh:'DEMO-仓-LA2', dock:'月台-DEMO-3'},
    {id:'TEST1234560', status:'待拆', wh:'DEMO-仓-LA1', dock:'月台-DEMO-4'}
  ];
  const PARSE = {
    isf: [
      {k:'isno', l:'ISF回执单号', value:'ISF-DEMO-解析-01', src:'bl', conf:'82%'},
      {k:'isco', l:'ISF申报公司', value:'DEMO-ISF-解析', src:'bl', conf:'76%'},
      {k:'isdone', l:'ISF完成', value:'10/06', src:'bl', conf:'70%'},
      {k:'isdate', l:'ISF回执日期', value:'10/06', src:'an', conf:'74%'},
      {k:'laemail', l:'LA出仓邮件', value:'提单已通知-演示', src:'bl', conf:'80%'},
      {k:'ordnote', l:'订单备注', value:'自动录入-演示', src:'pl', conf:'90%'}
    ],
    tr: [
      {k:'term', l:'码头', value:'DEMO-TML-解析', src:'an', conf:'84%'},
      {k:'arr', l:'Arrival Date', value:'10/06', src:'an', conf:'80%'},
      {k:'teno', l:'T&E号码', value:'TE-DEMO-解析-01', src:'bl', conf:'77%'},
      {k:'lfd', l:'货柜LFD', value:'10/08', src:'an', conf:'73%'},
      {k:'pkdone', l:'提柜完成', value:'10/07', src:'bl', conf:'68%'},
      {k:'trnote', l:'备注', value:'到港通知-演示', src:'an', conf:'88%'}
    ],
    wh: [
      {k:'wh', l:'操作仓库', value:'DEMO-仓-解析', src:'pl', conf:'86%'},
      {k:'indate', l:'入仓日期', value:'10/06', src:'an', conf:'75%'},
      {k:'devand', l:'拆柜日期', value:'10/06', src:'pl', conf:'72%'},
      {k:'devqty', l:'拆柜数量(托/件)', value:'18 / 1120-演示', src:'pl', conf:'83%'},
      {k:'seal', l:'seal号码', value:'SEAL-DEMO-解析', src:'bl', conf:'79%'}
    ],
    dl: [
      {k:'decl', l:'报关单号', value:'PED-DEMO-解析-01', src:'bl', conf:'81%'},
      {k:'cd', l:'清关完成', value:'10/07', src:'bl', conf:'69%'},
      {k:'car', l:'派送公司', value:'DEMO-派送-解析', src:'an', conf:'78%'},
      {k:'depart', l:'发车时间', value:'10/07 09:00', src:'bl', conf:'66%'},
      {k:'pdel', l:'预计派送', value:'10/08', src:'an', conf:'71%'}
    ]
  };

  const state = {
    quick:'', quickId:'',
    poolStatus:'全部', poolQ:'',
    roleQ:'', opRole:'isf',
    autoText:'', autoFile:'', autoNote:'',
    chatQ:'', chatId:''
  };

  function bb() {
    const root = typeof window !== 'undefined' ? window : globalThis;
    return root.BBTEX || null;
  }
  function mockOnly() {
    if (SOURCE !== 'mock') throw new Error('只允许演示数据');
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function norm(s) { return String(s || '').trim().toLowerCase(); }
  function roleBy(id) { return ROLES.filter(function (r) { return r.id === id; })[0] || ROLES[0]; }
  function orders() {
    mockOnly();
    const api = bb();
    if (!api || !api.ids || !api.order) return [];
    return api.ids().map(function (id) { return api.order(id); }).filter(Boolean);
  }
  function order(id) {
    const api = bb();
    return api && api.order ? api.order(id) : null;
  }

  function allowed(method, path) {
    const m = String(method || '').toUpperCase();
    if (m !== 'GET' && m !== 'QUERY') return false;
    const p = String(path || '').split('?')[0];
    if (!p || WRITE.test(p)) return false;
    return ALLOW.some(function (rule) {
      if (rule.charAt(rule.length - 1) === '/') return p.indexOf(rule) === 0;
      return p === rule;
    });
  }

  const stub = {
    calls: 0,
    wired: false,
    _last: 0,
    allowed: allowed,
    request: function (method, path) {
      this.calls += 1;
      if (!allowed(method, path)) {
        const denied = new Error('不在只读白名单');
        denied.code = 'DENY';
        throw denied;
      }
      const now = Date.now();
      if (this._last && now - this._last < 1000) {
        const rate = new Error('超过每秒 1 次');
        rate.code = 'RATE';
        throw rate;
      }
      this._last = now;
      const off = new Error('旧接口桩未接入，不能调用');
      off.code = 'NOT_WIRED';
      throw off;
    }
  };

  function quickHits(q) {
    mockOnly();
    const query = norm(q);
    const all = orders();
    if (!query) return [];
    return all.filter(function (o) {
      return norm(o.id).indexOf(query) >= 0 || norm(o.mbl).indexOf(query) >= 0 || norm(o.cc).indexOf(query) >= 0;
    });
  }
  function orderVisible(id, roleId, q) {
    mockOnly();
    const o = order(id);
    if (!o) return false;
    const query = norm(q);
    if (!query) return true;
    if (norm(o.id).indexOf(query) >= 0 || norm(o.mbl).indexOf(query) >= 0 || norm(o.cc).indexOf(query) >= 0) return true;
    return FIELDS.filter(function (f) { return f.sec === roleId; }).some(function (f) {
      const val = norm(o.fields && o.fields[f.k]);
      if (!val) return false;
      return val.indexOf(query) >= 0 || norm(f.l).indexOf(query) >= 0;
    });
  }
  function taskVisible(task, roleId, q) {
    mockOnly();
    const query = norm(q);
    if (!query) return true;
    if (!task) return false;
    if (order(task.id)) return orderVisible(task.id, roleId, q);
    const blob = norm((task.id || '') + ' ' + (task.line || '') + ' ' + (task.doc || '') + ' ' + (task.action || ''));
    return blob.indexOf(query) >= 0;
  }
  function nodesOf(node) {
    const names = (bb() && bb().NODES) || NODES;
    return names.map(function (name, i) {
      const cls = node >= names.length ? 'done' : (i < node ? 'done' : (i === node ? 'now' : ''));
      return '<li class="' + cls + '">' + esc(name) + '</li>';
    }).join('');
  }
  function statusText(o) {
    if (!o) return '没有这一柜';
    return (o.label || '订单') + (o.sub ? ' · ' + o.sub : '');
  }
  function keyFieldsHTML(o) {
    if (!o) return '';
    const rows = [
      ['柜号', o.id],
      ['提单号', o.mbl || '—'],
      ['客户代码', o.cc || '—'],
      ['订单状态', statusText(o)],
      ['公司', o.co || '—'],
      ['路线', o.route || '—']
    ];
    ['isdone','arr','pkdone','devand','cd','pdel'].forEach(function (k) {
      const f = FIELDS.filter(function (x) { return x.k === k; })[0];
      const val = o.fields && o.fields[k];
      rows.push([f ? f.l : k, val ? val : '空']);
    });
    return '<div class="lk-grid">' + rows.map(function (pair) {
      return '<div class="lk-field"><span>' + esc(pair[0]) + '</span><b>' + esc(pair[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  function summaryHTML(o) {
    if (!o) return '<p class="lk-empty">没有匹配的柜。</p>';
    const miss = (o.missing || []).map(function (m) { return m.l; }).join('、');
    return '<div class="lk-sum" data-order="' + esc(o.id) + '">'
      + '<p class="lk-status">' + esc(statusText(o)) + '</p>'
      + (miss ? '<p class="lk-miss">还差 ' + esc(miss) + '</p>' : '')
      + '<ol class="lk-nodes">' + nodesOf(o.node) + '</ol>'
      + keyFieldsHTML(o)
      + '</div>';
  }
  function focusQuick(pageId) {
    if (!state.quick) return pageId || '';
    const hits = quickHits(state.quick);
    if (state.quickId && hits.some(function (o) { return o.id === state.quickId; })) return state.quickId;
    return hits[0] ? hits[0].id : '';
  }
  function quickBody(pageId) {
    const hits = state.quick ? quickHits(state.quick) : [];
    const id = focusQuick(pageId);
    const o = id ? order(id) : (pageId ? order(pageId) : null);
    let list = '';
    if (state.quick && !hits.length) list = '<p class="lk-empty">没有匹配的柜。试试柜号、提单号或客户代码。</p>';
    else if (hits.length) {
      list = '<div class="lk-hits">' + hits.map(function (hit) {
        const on = hit.id === id ? ' on' : '';
        return '<button type="button" class="lk-hit' + on + '" data-lk="open-order" data-id="' + esc(hit.id) + '">'
          + esc(hit.id) + ' · ' + esc(hit.mbl || '') + ' · ' + esc(hit.cc || '') + '</button>';
      }).join('') + '</div>';
    }
    return list + summaryHTML(state.quick && !hits.length ? null : o);
  }
  function quickCardHTML(pageId) {
    mockOnly();
    return '<section class="lk-card" data-panel="quick" id="lkQuickCard">'
      + '<h2>订单快查</h2>'
      + '<p class="lk-note">按柜号、提单号或客户代码查。只显示订单状态、流程节点和关键栏。演示数据，只读。</p>'
      + '<div class="lk-bar"><label>柜号 / 提单号 / 客户代码'
      + '<input id="lkQuick" value="' + esc(state.quick) + '" placeholder="例如 TEST1234560、MBL-DEMO-0001、DEMO-A01" aria-label="订单快查"></label></div>'
      + '<div id="lkQuickOut">' + quickBody(pageId) + '</div></section>';
  }
  function statusCardHTML(pageId) {
    mockOnly();
    const id = focusQuick(pageId) || pageId;
    const o = id ? order(id) : null;
    const groups = ROLES.map(function (role) {
      const cells = FIELDS.filter(function (f) { return f.sec === role.id; }).map(function (f) {
        const val = o && o.fields ? o.fields[f.k] : '';
        const shown = val ? val : '空';
        return '<div class="lk-field' + (val ? '' : ' empty') + '"><span>' + esc(f.l) + (f.gate ? '<i class="lk-gate">关键栏</i>' : '') + '</span><b>' + esc(shown) + '</b></div>';
      }).join('');
      return '<section class="lk-role" data-role-sec="' + role.id + '"><h3>' + esc(role.sec) + ' · ' + esc(role.title) + '</h3><div class="lk-grid">' + cells + '</div></section>';
    }).join('');
    return '<section class="lk-card" data-panel="status" id="lkStatusCard">'
      + '<h2>状态维护详情</h2>'
      + '<p class="lk-note">' + (o ? esc(o.id) + ' · ' + esc(statusText(o)) : '先查出一柜') + '。四岗栏位只读，不能在这里改。</p>'
      + groups + '</section>';
  }
  function poolRows() {
    mockOnly();
    const q = norm(state.poolQ);
    return POOL.filter(function (row) {
      if (state.poolStatus !== '全部' && row.status !== state.poolStatus) return false;
      if (!q) return true;
      const o = order(row.id) || {};
      const blob = norm(row.id + ' ' + (o.mbl || '') + ' ' + (o.cc || '') + ' ' + row.wh + ' ' + row.status + ' ' + row.dock);
      return blob.indexOf(q) >= 0;
    });
  }
  function poolCardHTML() {
    mockOnly();
    const rows = poolRows();
    const opts = ['全部','待拆','拆柜中','已拆','待进仓'].map(function (name) {
      return '<option' + (name === state.poolStatus ? ' selected' : '') + '>' + name + '</option>';
    }).join('');
    const body = rows.map(function (row) {
      const o = order(row.id) || {};
      const f = (o.fields) || {};
      return '<tr data-pool="' + esc(row.id) + '"><td>' + esc(row.id) + '</td><td>' + esc(o.mbl || '—') + '</td><td>' + esc(o.cc || '—') + '</td><td>' + esc(row.status) + '</td><td>' + esc(row.wh) + '</td><td>' + esc(row.dock) + '</td><td>' + esc(f.indate || '空') + '</td><td>' + esc(f.devand || '空') + '</td><td>' + esc(f.shortover || '0') + '</td></tr>';
    }).join('');
    return '<section class="lk-card" data-panel="pool" id="lkPoolCard">'
      + '<h2>拆柜池</h2>'
      + '<p class="lk-note">今天（2026-10-05）的拆柜池。演示数据，只读。</p>'
      + '<div class="lk-bar"><label>状态<select id="lkPoolStatus" aria-label="拆柜池状态">' + opts + '</select></label>'
      + '<label>关键字<input id="lkPoolQ" value="' + esc(state.poolQ) + '" placeholder="柜号、提单号、客户代码、仓库" aria-label="拆柜池关键字"></label></div>'
      + '<div class="lk-scroll"><table class="lk-table"><thead><tr><th>柜号</th><th>提单号</th><th>客户代码</th><th>状态</th><th>仓库</th><th>月台</th><th>入仓日期</th><th>拆柜日期</th><th>少/多</th></tr></thead><tbody>'
      + (body || '<tr><td colspan="9">没有符合筛选的柜。</td></tr>')
      + '</tbody></table></div></section>';
  }
  function orderPanelsHTML(pageId) {
    return quickCardHTML(pageId) + statusCardHTML(pageId) + poolCardHTML();
  }
  function docKind(text, fileName) {
    const s = (String(fileName || '') + ' ' + String(text || '')).toLowerCase();
    if (/装箱|packing|cipl/.test(s)) return 'pl';
    if (/到港|a\/n|arrival|通知/.test(s)) return 'an';
    return 'bl';
  }
  function parseDoc(roleId, text, fileName) {
    mockOnly();
    const kind = docKind(text, fileName);
    const rows = (PARSE[roleId] || []).map(function (row) {
      const copy = {k:row.k, l:row.l, value:row.value, src:row.src, conf:row.conf};
      if (kind === 'pl') copy.src = 'pl';
      if (kind === 'an') copy.src = 'an';
      if (kind === 'bl') copy.src = row.src === 'pl' ? 'bl' : row.src;
      return copy;
    });
    const note = rows.filter(function (row) { return row.k === 'ordnote' || row.k === 'trnote'; })[0];
    const clip = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 24);
    if (note && clip) note.value = clip + '-演示';
    return rows;
  }
  function applyParse(id, roleId, text, fileName) {
    mockOnly();
    const api = bb();
    const role = roleBy(roleId);
    if (!api || !api.suggest || !order(id)) {
      state.autoNote = '先点一个柜号，再做自动录入。';
      return {n:0, gates:0};
    }
    const rows = parseDoc(roleId, text, fileName);
    let n = 0;
    let gates = 0;
    rows.forEach(function (row) {
      const before = order(id).fields[row.k];
      const view = api.suggest(id, row.k, row);
      if (String(before || '').trim()) return;
      if (view && view.state === 'suggest') {
        n += 1;
        if (view.gate) gates += 1;
      }
    });
    state.autoNote = n
      ? ('已生成 ' + n + ' 条建议' + (gates ? '，其中 ' + gates + ' 条是关键栏' : '') + '。关键栏不会自动确认。确认后记在「' + role.name + '」名下。')
      : '这一岗没有能预填的空栏。已经填过的栏不会被盖掉。';
    return {n:n, gates:gates};
  }
  function pendingHTML(orderId, roleId, who) {
    const api = bb();
    if (!api || !order(orderId)) return '';
    const items = FIELDS.filter(function (f) { return f.sec === roleId; }).map(function (f) {
      const view = api.fieldView(orderId, f.k);
      if (!view || view.state !== 'suggest') return '';
      return '<li><span>' + esc(f.l) + (view.gate ? '<i class="lk-gate">关键栏</i>' : '') + '</span><b>' + esc(view.value) + '</b>'
        + '<button type="button" data-lk="confirm" data-k="' + esc(f.k) + '" data-id="' + esc(orderId) + '" data-who="' + esc(who) + '">确认</button></li>';
    }).join('');
    const o = order(orderId);
    const logs = ((o && o.audit) || []).filter(function (a) { return a.text && a.text.indexOf('确认人') >= 0; }).slice(-4);
    const log = logs.map(function (a) { return '<li>' + esc(a.text) + '</li>'; }).join('');
    return (items ? '<ul class="lk-sug" data-panel="suggestions">' + items + '</ul>' : '')
      + (log ? '<ul class="lk-log">' + log + '</ul>' : '');
  }
  function roleToolsHTML(opts) {
    mockOnly();
    opts = opts || {};
    const role = roleBy(opts.roleId || state.opRole || 'isf');
    const who = opts.who || role.name;
    const orderId = opts.orderId || '';
    const roles = opts.showRoles ? '<div class="lk-roles">' + ROLES.map(function (r) {
      return '<button type="button" data-lk="op-role" data-role="' + r.id + '"' + (r.id === role.id ? ' class="on"' : '') + '>' + esc(r.title) + ' · ' + esc(r.name) + '</button>';
    }).join('') + '</div>' : '';
    return '<section class="lk-card" data-panel="role-tools" id="lkRoleTools">'
      + roles
      + '<h2 data-panel="role-query">' + esc(role.title) + '查询</h2>'
      + '<p class="lk-note">只查这一岗的栏位，外加柜号、提单号、客户代码。不会拿别的岗位栏位来对。</p>'
      + '<div class="lk-bar"><label>' + esc(role.title) + '查询'
      + '<input id="roleQuery" value="' + esc(state.roleQ) + '" placeholder="柜号、提单号、客户代码，或本岗栏位" aria-label="' + esc(role.title) + '查询"></label></div>'
      + '<h2 data-panel="auto-entry">自动录入</h2>'
      + '<p class="lk-note">粘贴文字，或把 BOL、装箱单、到港通知拖进来。栏位先变成建议，要点确认才写入。关键栏不会自动确认。确认人记为「' + esc(who) + '」。</p>'
      + '<div class="lk-drop" id="autoDrop">把文件拖到这里。演示只在本机读取，不会上传。</div>'
      + '<input id="autoFile" type="file" hidden aria-label="选择单证">'
      + '<textarea id="autoText" aria-label="粘贴单证文字" placeholder="例如：提单 BOL TEST2468024 装箱单">' + esc(state.autoText) + '</textarea>'
      + '<div class="lk-bar"><button type="button" class="lk-go" data-lk="parse" data-role="' + esc(role.id) + '" data-id="' + esc(orderId) + '" data-who="' + esc(who) + '">生成建议</button>'
      + '<button type="button" data-lk="pick-file">选择文件</button></div>'
      + (state.autoFile ? '<p class="lk-note">文件：' + esc(state.autoFile) + '</p>' : '')
      + (state.autoNote ? '<p class="lk-note" id="autoNote">' + esc(state.autoNote) + '</p>' : '<p class="lk-note" id="autoNote"></p>')
      + pendingHTML(orderId, role.id, who)
      + '</section>';
  }
  function chatLookupHTML(roomId) {
    mockOnly();
    if (state.chatRoomShown !== roomId) {
      state.chatRoomShown = roomId;
      state.chatQ = '';
      state.chatId = '';
    }
    const query = state.chatQ;
    const hits = query ? quickHits(query) : [];
    let id = roomId;
    if (query) id = (state.chatId && hits.some(function (o) { return o.id === state.chatId; })) ? state.chatId : (hits[0] ? hits[0].id : '');
    const o = id ? order(id) : null;
    return '<section class="lk-card lk-chat" data-panel="chat-lookup" id="lkChatCard">'
      + '<h2>本柜状态</h2>'
      + '<div class="lk-bar"><label>柜号 / 提单号 / 客户代码'
      + '<input id="lkChatQ" value="' + esc(state.chatQ) + '" placeholder="查另一柜的状态" aria-label="聊天里的订单快查"></label></div>'
      + '<div id="lkChatOut">' + (query && !hits.length ? '<p class="lk-empty">没有匹配的柜。</p>' : summaryHTML(o)) + '</div></section>';
  }

  let refreshTimer = 0;
  function refresh(focusId) {
    if (typeof window === 'undefined' || typeof window.render !== 'function') return;
    const el = focusId ? document.getElementById(focusId) : null;
    const pos = el ? el.selectionStart : null;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(function () {
      window.render();
      if (!focusId) return;
      const next = document.getElementById(focusId);
      if (!next) return;
      next.focus();
      if (pos != null && next.setSelectionRange) {
        try { next.setSelectionRange(pos, pos); } catch (e) {}
      }
    }, 0);
  }
  function openOrder(id) {
    state.quickId = id;
    state.chatId = id;
    if (typeof window.wbOpenId === 'function' && window.wbOpenId(id)) return;
    if (typeof window.setHash === 'function') window.setHash(id);
    else refresh('');
  }
  function readFile(file, done) {
    const reader = new FileReader();
    reader.onload = function () { done(String(reader.result || ''), file.name || ''); };
    reader.onerror = function () { done('', file.name || ''); };
    reader.readAsText(file);
  }
  function onInput(e) {
    const t = e.target;
    if (!t || !t.id) return;
    if (t.id === 'lkQuick') { state.quick = t.value; state.quickId = ''; refresh('lkQuick'); }
    else if (t.id === 'lkPoolQ') { state.poolQ = t.value; refresh('lkPoolQ'); }
    else if (t.id === 'roleQuery') { state.roleQ = t.value; refresh('roleQuery'); }
    else if (t.id === 'lkChatQ') { state.chatQ = t.value; state.chatId = ''; refresh('lkChatQ'); }
    else if (t.id === 'autoText') state.autoText = t.value;
  }
  function onChange(e) {
    const t = e.target;
    if (!t) return;
    if (t.id === 'lkPoolStatus') { state.poolStatus = t.value; refresh('lkPoolQ'); }
    if (t.id === 'autoFile' && t.files && t.files[0]) {
      readFile(t.files[0], function (text, name) {
        state.autoFile = name;
        if (text) state.autoText = text.slice(0, 4000);
        const btn = document.querySelector('[data-lk="parse"]');
        if (btn) applyParse(btn.dataset.id, btn.dataset.role, state.autoText, name);
        refresh('autoText');
      });
    }
  }
  function onClick(e) {
    const el = e.target.closest('[data-lk]');
    if (!el) return;
    const act = el.dataset.lk;
    if (act === 'open-order') { openOrder(el.dataset.id); return; }
    if (act === 'op-role') { state.opRole = el.dataset.role; state.autoNote = ''; refresh('roleQuery'); return; }
    if (act === 'pick-file') {
      const input = document.getElementById('autoFile');
      if (input) input.click();
      return;
    }
    if (act === 'parse') {
      const text = (document.getElementById('autoText') || {}).value || state.autoText;
      state.autoText = text;
      applyParse(el.dataset.id, el.dataset.role, text, state.autoFile);
      refresh('autoText');
      return;
    }
    if (act === 'confirm') {
      const api = bb();
      if (api && api.accept) api.accept(el.dataset.id, el.dataset.k, el.dataset.who, '');
      state.autoNote = '已确认。确认人是「' + (el.dataset.who || '') + '」。关键栏只有点确认才会写入。';
      refresh('');
    }
  }
  function onDrag(e) {
    const zone = e.target.closest ? e.target.closest('#autoDrop') : null;
    if (!zone) return;
    e.preventDefault();
    if (e.type === 'dragover') zone.classList.add('over');
    if (e.type === 'dragleave') zone.classList.remove('over');
    if (e.type === 'drop') {
      zone.classList.remove('over');
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (!file) return;
      readFile(file, function (text, name) {
        state.autoFile = name;
        state.autoText = text ? text.slice(0, 4000) : name;
        const btn = document.querySelector('[data-lk="parse"]');
        if (btn) applyParse(btn.dataset.id, btn.dataset.role, state.autoText, name);
        refresh('autoText');
      });
    }
  }

  function selfCheck() {
    const errs = [];
    function eq(name, cond) { if (!cond) errs.push(name); }
    const api = bb();
    api.reset();
    const before = stub.calls;
    quickHits('MBL-DEMO-0001');
    eq('mock does not call stub', stub.calls === before);
    eq('hit by mbl', quickHits('MBL-DEMO-0001').some(function (o) { return o.id === 'TEST1234560'; }));
    eq('hit by cc', quickHits('DEMO-A01').length >= 2);
    eq('miss', quickHits('NOT-A-CODE').length === 0);
    eq('allow pool', allowed('GET', '/inventory/inbound/stripping/pool'));
    eq('allow query', allowed('QUERY', '/wms/order/queryPage'));
    eq('allow state', allowed('GET', '/wms/stateMaintenance/get/1'));
    eq('allow isf', allowed('GET', '/wms/isfDeclaration/get/1'));
    eq('deny post', !allowed('POST', '/wms/order/queryPage'));
    eq('deny add', !allowed('GET', '/wms/order/addDraft'));
    eq('deny update', !allowed('GET', '/wms/stateMaintenance/update'));
    eq('role scope', orderVisible('TEST5566778', 'dl', '清关完成') && !orderVisible('TEST5566778', 'isf', '清关完成'));
    let code1 = '';
    let code2 = '';
    try { stub.request('GET', '/wms/order/queryPage'); } catch (e) { code1 = e.code; }
    try { stub.request('GET', '/inventory/inbound/stripping/pool'); } catch (e) { code2 = e.code; }
    eq('stub not wired', code1 === 'NOT_WIRED');
    eq('stub rate', code2 === 'RATE');
    try { stub.request('POST', '/wms/order/update'); } catch (e) { eq('stub deny', e.code === 'DENY'); }
    const target = api.order('TEST2468024');
    const beforeGate = target.fields.isdone;
    const view = api.suggest('TEST2468024', 'isdone', {value:'10/06', src:'bl', conf:'70%', label:'ISF完成'});
    eq('gate stays empty', target.fields.isdone === beforeGate && !String(target.fields.isdone || '').trim());
    eq('gate suggested', view && view.state === 'suggest' && view.gate);
    api.accept('TEST2468024', 'isdone', '陈静', '');
    eq('confirmer recorded', (api.order('TEST2468024').audit || []).some(function (a) { return a.text.indexOf('确认人 陈静') >= 0; }));
    eq('still mock', SOURCE === 'mock');
    eq('stub unwired flag', stub.wired === false);
    return errs;
  }

  const css = ''
    + '.lk-card{background:#fff;border:1px solid #E3E6EB;border-radius:13px;box-shadow:0 0 0 1px rgba(26,29,35,.04);padding:16px 16px 18px;margin:0 0 13px;min-width:0}'
    + '.lk-card h2{font-size:16px;font-weight:650;line-height:24px;margin:0 0 4px}'
    + '.lk-card h3{font-size:14px;font-weight:650;margin:14px 0 8px}'
    + '.lk-note,.lk-miss{font-size:13px;color:#5C6370;line-height:1.5;margin:0 0 8px}'
    + '.lk-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;margin:0 0 10px}'
    + '.lk-bar label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:#3A3F4A;min-width:0;flex:1}'
    + '.lk-bar input,.lk-bar select,.lk-card textarea{height:34px;border:1px solid #E3E6EB;border-radius:8px;padding:0 10px;background:#fff;font:inherit;min-width:0;width:100%}'
    + '.lk-card textarea{height:72px;padding:8px 10px;resize:vertical;margin-bottom:8px}'
    + '.lk-bar button,.lk-go,.lk-sug button,.lk-roles button{height:34px;padding:0 12px;border-radius:8px;border:1px solid #E3E6EB;background:#fff;font-weight:650;cursor:pointer}'
    + '.lk-go,.lk-roles button.on{background:#2CA01C;border-color:#2CA01C;color:#fff}'
    + '.lk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 13px}'
    + '.lk-field{min-width:0;display:flex;flex-direction:column;gap:2px;padding:6px 0}'
    + '.lk-field span{font-size:13px;color:#5C6370;font-weight:600}'
    + '.lk-field b{font-size:14px;font-weight:650;color:#1A1D23;word-break:break-word}'
    + '.lk-field.empty b{color:#7A8290;font-weight:500}'
    + '.lk-gate{font-style:normal;font-weight:650;font-size:12px;color:#1A5FB4;margin-left:6px}'
    + '.lk-nodes{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;padding:0;list-style:none}'
    + '.lk-nodes li{font-size:12px;color:#7A8290;background:#F4F5F7;border-radius:4px;padding:2px 8px}'
    + '.lk-nodes li.done{background:#E8F6E8;color:#2CA01C;font-weight:650}'
    + '.lk-nodes li.now{background:#E8F1FC;color:#1A5FB4;font-weight:650}'
    + '.lk-status{font-size:16px;font-weight:650;margin:0 0 6px}'
    + '.lk-hits{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}'
    + '.lk-hit{border:1px solid #E3E6EB;background:#fff;border-radius:8px;padding:4px 8px;font-size:13px;cursor:pointer}'
    + '.lk-hit.on{background:#E8F1FC;border-color:#C5D9F5;color:#1A5FB4;font-weight:650}'
    + '.lk-empty{font-size:14px;color:#7A8290;margin:4px 0 8px}'
    + '.lk-scroll{overflow-x:auto;max-width:100%}'
    + '.lk-table{width:100%;border-collapse:collapse;font-size:13px}'
    + '.lk-table th,.lk-table td{text-align:left;padding:6px 8px;border-bottom:1px solid #ECEEF2;white-space:nowrap}'
    + '.lk-table th{font-size:12px;color:#5C6370;font-weight:650}'
    + '.lk-drop{border:1px dashed #C5CDD8;border-radius:8px;padding:12px;background:#F4F5F7;color:#5C6370;font-size:13px;margin-bottom:8px}'
    + '.lk-drop.over{border-color:#2E7BE5;background:#E8F1FC;color:#1A5FB4}'
    + '.lk-sug,.lk-log{margin:8px 0 0;padding:0;list-style:none}'
    + '.lk-sug li,.lk-log li{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:6px 0;border-top:1px solid #ECEEF2;font-size:13px}'
    + '.lk-roles{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}'
    + '.lk-chat .lk-grid{grid-template-columns:1fr}'
    + '.lk-chat{margin-bottom:8px}'
    + '@media (max-width:1360px){.lk-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lk-chat .lk-grid{grid-template-columns:1fr}}';

  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.id = 'legacy-lookup-css';
    style.textContent = css;
    document.head.appendChild(style);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    document.addEventListener('click', onClick);
    document.addEventListener('dragover', onDrag);
    document.addEventListener('dragleave', onDrag);
    document.addEventListener('drop', onDrag);
  }

  const api = {
    SOURCE: SOURCE,
    state: state,
    stub: stub,
    allowed: allowed,
    ROLES: ROLES,
    FIELDS: FIELDS,
    quickHits: quickHits,
    orderVisible: orderVisible,
    taskVisible: taskVisible,
    parseDoc: parseDoc,
    applyParse: applyParse,
    quickCardHTML: quickCardHTML,
    statusCardHTML: statusCardHTML,
    poolCardHTML: poolCardHTML,
    orderPanelsHTML: orderPanelsHTML,
    roleToolsHTML: roleToolsHTML,
    chatLookupHTML: chatLookupHTML,
    selfCheck: selfCheck
  };
  const root = typeof window !== 'undefined' ? window : globalThis;
  root.LegacyLookup = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
