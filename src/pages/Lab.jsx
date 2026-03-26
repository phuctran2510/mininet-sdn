import { useState } from 'react'
import { PageHdr } from '../components/UI'

const LABS = [
  { id:'l1',ch:2,title:'Lab 1: Cài đặt Mininet',diff:'easy',time:'30 phút',
    obj:'Cài đặt Mininet và kiểm tra hoạt động cơ bản.',
    steps:[
      {t:'Cập nhật hệ thống',info:'Trước khi cài, cập nhật package list:',code:`sudo apt-get update\nsudo apt-get upgrade -y`},
      {t:'Cài đặt Mininet',info:'Cài từ Ubuntu repository:',code:`sudo apt-get install mininet -y\nmn --version`},
      {t:'Cài Open vSwitch',info:'OVS là switch ảo cần thiết:',code:`sudo apt-get install openvswitch-switch -y\nsudo service openvswitch-switch start\nsudo ovs-vsctl show`},
      {t:'Test cơ bản',info:'Chạy test pingall:',code:`sudo mn --test pingall\n# Kết quả: *** Results: 0% dropped (2/2 received)`},
      {t:'Dọn dẹp',info:'Luôn chạy sau session:',code:`sudo mn -c`},
    ],
    expect:'*** Results: 0% dropped (2/2 received)\n*** Done',
    tips:["Nếu lỗi 'RTNETLINK': chạy sudo mn -c trước","OVS phải running trước khi start Mininet"]
  },
  { id:'l2',ch:3,title:'Lab 2: CLI cơ bản',diff:'easy',time:'45 phút',
    obj:'Sử dụng thành thạo Mininet CLI.',
    steps:[
      {t:'Khởi động Mininet',info:'Tạo topology linear 4 switch:',code:`sudo mn --topo linear,4 --mac`},
      {t:'Khám phá nodes',info:'Xem cấu trúc mạng:',code:`mininet> nodes\nmininet> net\nmininet> dump`},
      {t:'Test kết nối',info:'Kiểm tra ping:',code:`mininet> pingall\nmininet> h1 ping -c 3 h4`},
      {t:'Đo băng thông',info:'Dùng iperf built-in:',code:`mininet> iperf h1 h4`},
      {t:'Xem Flow Table',info:'OVS flow entries:',code:`mininet> sh ovs-ofctl dump-flows s1`},
    ],
    expect:'*** Ping: testing ping reachability\n  h1 -> h2 h3 h4\n*** Results: 0% dropped',
    tips:["Tab tự động complete","Ctrl+C dừng lệnh đang chạy","exit hoặc Ctrl+D để thoát"]
  },
  { id:'l3',ch:4,title:'Lab 3: Custom Topology',diff:'medium',time:'60 phút',
    obj:'Tạo topology tùy chỉnh bằng Python API.',
    steps:[
      {t:'Tạo file Python',info:'Tạo custom_topo.py:',code:`nano custom_topo.py`},
      {t:'Viết code topology',info:'2 switch, 4 host:',code:`#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.node import Controller, OVSSwitch
from mininet.link import TCLink
from mininet.log import setLogLevel
from mininet.cli import CLI

def mytopo():
    net = Mininet(controller=Controller,
                  switch=OVSSwitch, link=TCLink,
                  autoSetMacs=True)
    c0 = net.addController('c0')
    s1 = net.addSwitch('s1')
    s2 = net.addSwitch('s2')
    h1 = net.addHost('h1', ip='10.0.1.1/24')
    h2 = net.addHost('h2', ip='10.0.1.2/24')
    h3 = net.addHost('h3', ip='10.0.2.1/24')
    h4 = net.addHost('h4', ip='10.0.2.2/24')
    net.addLink(h1, s1, bw=100, delay='2ms')
    net.addLink(h2, s1, bw=100, delay='2ms')
    net.addLink(h3, s2, bw=100, delay='2ms')
    net.addLink(h4, s2, bw=100, delay='2ms')
    net.addLink(s1, s2, bw=1000, delay='1ms')
    net.start()
    CLI(net)
    net.stop()

if __name__ == '__main__':
    setLogLevel('info')
    mytopo()`},
      {t:'Chạy và test',info:'Khởi động topology:',code:`sudo python3 custom_topo.py\nmininet> pingall\nmininet> iperf h1 h3`},
    ],
    expect:'*** Results: 0% dropped (12/12 received)',
    tips:["autoSetMacs=True tránh xung đột MAC","TCLink cần module kernel 'sch_htb'"]
  },
  { id:'l4',ch:5,title:'Lab 4: Python API Automation',diff:'medium',time:'75 phút',
    obj:'Tự động hóa đo hiệu suất với Python API.',
    steps:[
      {t:'Script RTT matrix',info:'Đo ping giữa tất cả hosts:',code:`#!/usr/bin/env python3
from mininet.net import Mininet
from mininet.topo import SingleSwitchTopo
from mininet.log import setLogLevel

def rtt_matrix():
    topo = SingleSwitchTopo(n=4)
    net = Mininet(topo=topo, autoSetMacs=True)
    net.start()
    hosts = net.hosts
    print("\\n=== RTT Matrix (avg ms) ===")
    header = f"{'':8}" + "".join(f"{h.name:10}" for h in hosts)
    print(header)
    for src in hosts:
        row = f"{src.name:8}"
        for dst in hosts:
            if src == dst:
                row += f"{'---':10}"
            else:
                out = src.cmd(f'ping -c 5 -q {dst.IP()}')
                avg = 'N/A'
                for l in out.split('\\n'):
                    if 'rtt min' in l:
                        avg = l.split('/')[4] + 'ms'
                row += f"{avg:10}"
        print(row)
    net.stop()

setLogLevel('warning')
rtt_matrix()`},
    ],
    expect:'=== RTT Matrix (avg ms) ===\n         h1        h2        h3\nh1       ---       0.45ms    0.48ms',
    tips:["setLogLevel('warning') giảm noise","Dùng -q flag với ping"]
  },
  { id:'l5',ch:6,title:'Lab 5: Ryu Controller',diff:'hard',time:'90 phút',
    obj:'Viết Ryu controller L2 learning switch.',
    steps:[
      {t:'Cài Ryu',info:'',code:`sudo pip3 install ryu`},
      {t:'Tạo simple_switch.py',info:'L2 learning switch cơ bản:',code:`from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (CONFIG_DISPATCHER,
    MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ether_types

class SimpleSwitch13(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.mac_to_port = {}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def features_handler(self, ev):
        dp = ev.msg.datapath
        ofp, parser = dp.ofproto, dp.ofproto_parser
        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(ofp.OFPP_CONTROLLER, ofp.OFPCML_NO_BUFFER)]
        inst = [parser.OFPInstructionActions(ofp.OFPIT_APPLY_ACTIONS, actions)]
        dp.send_msg(parser.OFPFlowMod(datapath=dp, priority=0, match=match, instructions=inst))

    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg; dp = msg.datapath
        ofp, parser = dp.ofproto, dp.ofproto_parser
        in_port = msg.match['in_port']
        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        if eth.ethertype == ether_types.ETH_TYPE_LLDP: return
        dst, src, dpid = eth.dst, eth.src, dp.id
        self.mac_to_port.setdefault(dpid, {})
        self.mac_to_port[dpid][src] = in_port
        out_port = self.mac_to_port[dpid].get(dst, ofp.OFPP_FLOOD)
        actions = [parser.OFPActionOutput(out_port)]
        if out_port != ofp.OFPP_FLOOD:
            match = parser.OFPMatch(in_port=in_port, eth_dst=dst, eth_src=src)
            inst = [parser.OFPInstructionActions(ofp.OFPIT_APPLY_ACTIONS, actions)]
            dp.send_msg(parser.OFPFlowMod(datapath=dp, priority=1, match=match, instructions=inst))
        data = msg.data if msg.buffer_id == ofp.OFP_NO_BUFFER else None
        dp.send_msg(parser.OFPPacketOut(datapath=dp, buffer_id=msg.buffer_id,
            in_port=in_port, actions=actions, data=data))`},
      {t:'Chạy Ryu + Mininet',info:'2 terminal:',code:`# Terminal 1 — Ryu:
ryu-manager simple_switch.py

# Terminal 2 — Mininet:
sudo mn --controller=remote,ip=127.0.0.1,port=6653 \\
        --switch ovs,protocols=OpenFlow13 \\
        --topo single,3
mininet> pingall`},
    ],
    expect:'*** Results: 0% dropped (6/6 received)',
    tips:["Khởi động Ryu TRƯỚC Mininet","Ryu log cho thấy Packet-In events","port 6653 = OpenFlow 1.3 chuẩn"]
  },
  { id:'l6',ch:7,title:'Lab 6: iperf3 Performance',diff:'medium',time:'60 phút',
    obj:'Đo và so sánh hiệu suất với các cấu hình link khác nhau.',
    steps:[
      {t:'Cài iperf3',info:'',code:`sudo apt-get install iperf3 -y`},
      {t:'Topology với QoS',info:'',code:`sudo mn --topo single,3 --link tc,bw=100,delay=5ms`},
      {t:'TCP bandwidth test',info:'',code:`mininet> h1 iperf3 -s &
mininet> h2 iperf3 -c 10.0.0.1 -t 30 -i 5
mininet> h3 iperf3 -c 10.0.0.1 -P 4 -t 30`},
      {t:'UDP test',info:'',code:`mininet> h2 iperf3 -c 10.0.0.1 -u -b 50M -t 30`},
      {t:'So sánh delay',info:'Đo với delay khác nhau:',code:`# delay=1ms
sudo mn --link tc,bw=100,delay=1ms
mininet> h1 iperf3 -s & ; h2 iperf3 -c 10.0.0.1 -t 10
# delay=50ms (WAN simulation)
sudo mn --link tc,bw=100,delay=50ms
mininet> h1 iperf3 -s & ; h2 iperf3 -c 10.0.0.1 -t 10`},
    ],
    expect:'[ ID] Interval     Transfer    Bitrate\n[  5] 0.00-30.00s  357 MBytes  99.7 Mbits/sec',
    tips:["Bandwidth thực ~95-100% vì overhead","Dùng -J để JSON output","TCP throughput giảm khi latency tăng (BDP)"]
  },
]

export default function Lab() {
  const [lab, setLab] = useState(LABS[0])
  const [step, setStep] = useState(0)
  const [done, setDone] = useState({})

  return (
    <div>
      <PageHdr icon="🧪" title="Lab Thực hành" sub="Hướng dẫn từng bước — copy code và chạy trực tiếp"/>

      <div style={{display:'grid',gridTemplateColumns:'210px 1fr',gap:'1.3rem',alignItems:'start'}}>
        {/* Lab list */}
        <div style={{position:'sticky',top:'1rem'}}>
          <div style={{fontSize:'.67rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.5rem',textTransform:'uppercase',letterSpacing:'.06em'}}>Danh sách Lab</div>
          {LABS.map(l => (
            <button key={l.id} onClick={()=>{setLab(l);setStep(0)}}
              style={{
                display:'flex',flexDirection:'column',gap:'.18rem',
                width:'100%',padding:'.6rem .7rem',borderRadius:8,marginBottom:3,
                background: lab.id===l.id ? 'rgba(0,212,255,.08)' : 'var(--sur)',
                border: lab.id===l.id ? '1px solid rgba(0,212,255,.25)' : '1px solid var(--brd)',
                cursor:'pointer',textAlign:'left',transition:'all .14s',
              }}
            >
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:'.83rem',color:lab.id===l.id?'var(--acc)':'var(--txt)',fontWeight:600,fontFamily:'var(--fd)'}}>{l.title}</span>
                {done[l.id] && <span style={{color:'var(--grn)',fontSize:'.85rem'}}>✓</span>}
              </div>
              <div style={{display:'flex',gap:'.3rem'}}>
                <span className={`badge ${l.diff==='easy'?'b-green':l.diff==='medium'?'b-blue':'b-red'}`} style={{fontSize:'.6rem'}}>
                  {l.diff==='easy'?'Dễ':l.diff==='medium'?'TB':'Khó'}
                </span>
                <span style={{fontSize:'.67rem',color:'var(--txt3)'}}>⏱ {l.time}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="fu">
          <div className="card" style={{padding:'1.2rem',marginBottom:'1rem',background:'rgba(0,212,255,.03)',borderColor:'rgba(0,212,255,.18)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'.7rem'}}>
              <div>
                <h2 style={{fontFamily:'var(--fm)',fontSize:'1.1rem',marginBottom:'.3rem'}}>{lab.title}</h2>
                <p style={{color:'var(--txt3)',fontSize:'.85rem'}}><strong style={{color:'var(--txt2)'}}>Mục tiêu:</strong> {lab.obj}</p>
              </div>
              <button className={`btn ${done[lab.id]?'bg':'bp'}`}
                onClick={()=>setDone(p=>({...p,[lab.id]:!p[lab.id]}))}>
                {done[lab.id]?'✓ Xong':'Mark done'}
              </button>
            </div>
            <div style={{marginTop:'.9rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem',color:'var(--txt3)',marginBottom:'.3rem'}}>
                <span>Tiến độ</span>
                <span>{step+1}/{lab.steps.length}</span>
              </div>
              <div className="prog"><div className="prog-f" style={{width:`${((step+1)/lab.steps.length)*100}%`}}/></div>
            </div>
          </div>

          {/* Steps */}
          {lab.steps.map((s,idx) => (
            <div key={idx} className="card"
              style={{
                padding:'1rem',marginBottom:'.6rem',cursor:'pointer',
                borderColor: idx===step?'var(--acc)':idx<step?'rgba(0,230,118,.3)':'var(--brd)',
                background: idx===step?'rgba(0,212,255,.03)':idx<step?'rgba(0,230,118,.02)':'var(--sur)',
                transition:'all .18s'
              }}
              onClick={()=>setStep(idx)}
            >
              <div style={{display:'flex',gap:'.7rem',alignItems:'flex-start'}}>
                <div style={{
                  width:26,height:26,borderRadius:'50%',flexShrink:0,
                  background: idx<step?'var(--grn)':idx===step?'var(--acc)':'var(--sur2)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'.72rem',fontWeight:700,color:idx<=step?'#000':'var(--txt3)',fontFamily:'var(--fc)'
                }}>{idx<step?'✓':idx+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:'.88rem',color:idx===step?'var(--txt)':'var(--txt2)',marginBottom:idx===step?.4:0}}>
                    {s.t}
                  </div>
                  {idx===step && (
                    <>
                      {s.info && <p style={{color:'var(--txt3)',fontSize:'.82rem',marginBottom:'.5rem'}}>{s.info}</p>}
                      <pre data-lang="bash"><code style={{color:'#9ab'}}>{s.code}</code></pre>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Expected */}
          <div className="alert as" style={{marginBottom:'.6rem'}}>
            <div style={{fontWeight:600,marginBottom:'.35rem',fontSize:'.83rem'}}>✅ Kết quả mong đợi</div>
            <pre style={{margin:0,background:'none',border:'none',padding:0,fontSize:'.76rem'}}>
              <code style={{color:'var(--grn)'}}>{lab.expect}</code>
            </pre>
          </div>

          {lab.tips.length>0 && (
            <div className="alert aw">
              <div style={{fontWeight:600,marginBottom:'.35rem',fontSize:'.83rem'}}>💡 Tips</div>
              <ul className="ul">{lab.tips.map((t,i)=><li key={i} style={{fontSize:'.82rem'}}>{t}</li>)}</ul>
            </div>
          )}

          <div style={{display:'flex',gap:'.5rem',marginTop:'.8rem'}}>
            <button className="btn bg" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}>← Trước</button>
            <button className="btn bo" onClick={()=>setStep(s=>Math.min(lab.steps.length-1,s+1))} disabled={step===lab.steps.length-1}>Tiếp →</button>
            {step===lab.steps.length-1&&<button className="btn bp" onClick={()=>setDone(p=>({...p,[lab.id]:true}))}>✓ Hoàn thành</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
