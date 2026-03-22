export const INITIAL_THEORY = [
  {
    id: 't1',
    title: 'SDN (Software Defined Networking) là gì?',
    category: 'Khái niệm cơ bản',
    level: 'Cơ bản',
    content: `SDN (Software Defined Networking) là kiến trúc mạng tách biệt **control plane** (mặt phẳng điều khiển) khỏi **data plane** (mặt phẳng dữ liệu). Thay vì mỗi thiết bị mạng tự quyết định cách chuyển tiếp gói tin, toàn bộ logic điều khiển được tập trung về một **SDN Controller** trung tâm.

**Ba đặc điểm cốt lõi của SDN:**
- Separation of control and data planes
- Centralized network intelligence và programmability  
- Open interfaces (OpenFlow, REST API, NETCONF)

**Lợi ích của SDN:**
- Quản lý mạng linh hoạt, có thể lập trình
- Giảm chi phí vận hành (OpEx)
- Tăng tốc độ triển khai dịch vụ mới
- Tối ưu hóa tài nguyên mạng`,
    code: `# Mô hình kiến trúc SDN 3 lớp:
# 
# ┌─────────────────────────────────┐
# │      Application Layer          │  ← Business apps, network apps
# │  (SDN Apps, Network Policies)   │
# └──────────────┬──────────────────┘
#                │ Northbound API (REST/JSON)
# ┌──────────────▼──────────────────┐
# │       Control Layer             │  ← SDN Controller
# │  (NOX, POX, Ryu, ONOS, ODL)    │
# └──────────────┬──────────────────┘
#                │ Southbound API (OpenFlow)
# ┌──────────────▼──────────────────┐
# │    Infrastructure Layer         │  ← Physical/Virtual switches
# │  (OpenFlow Switches, OVS)       │
# └─────────────────────────────────┘`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 't2',
    title: 'OpenFlow Protocol - Giao thức nền tảng SDN',
    category: 'OpenFlow',
    level: 'Cơ bản',
    content: `OpenFlow là giao thức chuẩn đầu tiên cho SDN, cho phép controller giao tiếp với các switch thông qua **flow tables**.

**Cấu trúc Flow Entry gồm:**
- **Match Fields**: in_port, eth_src, eth_dst, ip_src, ip_dst, tp_src, tp_dst
- **Priority**: Độ ưu tiên (0-65535, cao hơn = ưu tiên hơn)
- **Counters**: Đếm packets và bytes đã match
- **Instructions**: Apply-Actions, Goto-Table, Meter
- **Timeouts**: idle_timeout và hard_timeout
- **Cookie**: Định danh flow (64-bit)

**Các loại OpenFlow messages:**
- **Packet-In**: Switch → Controller (gói tin không khớp flow table)
- **Flow-Mod**: Controller → Switch (thêm/sửa/xóa flow rule)
- **Packet-Out**: Controller → Switch (gửi gói tin)
- **Port-Status**: Switch → Controller (thay đổi port)
- **Stats-Request/Reply**: Thu thập thống kê`,
    code: `# Xem flow table trên switch trong Mininet
mininet> s1 ovs-ofctl dump-flows s1

# Output mẫu (OpenFlow 1.0):
NXST_FLOW reply (xid=0x4):
 cookie=0x0, duration=5.3s, table=0, n_packets=10,
 n_bytes=840, idle_age=0,
 priority=1,in_port=1 actions=output:2
 priority=1,in_port=2 actions=output:1
 priority=0 actions=CONTROLLER:65535

# OpenFlow 1.3 format:
$ sudo ovs-ofctl -O OpenFlow13 dump-flows s1`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 't3',
    title: 'Mininet - Network Emulator cho SDN',
    category: 'Mininet',
    level: 'Cơ bản',
    content: `Mininet là **network emulator** cho phép tạo mạng ảo hoàn chỉnh trên một máy Linux duy nhất, bao gồm hosts, switches, controllers và links.

**Cách Mininet hoạt động:**
- Dùng **Linux Network Namespaces** để tạo hosts độc lập
- Dùng **Virtual Ethernet (veth pairs)** để tạo links
- Dùng **Open vSwitch (OVS)** làm software switch
- Dùng **Linux Traffic Control (tc)** để emulate bandwidth/delay

**Ưu điểm:**
- Nhanh: Khởi động trong vài giây
- Linh hoạt: Tạo bất kỳ topology nào
- Thực tế: Chạy code Linux thực trên hosts
- Tiết kiệm: Chỉ cần 1 máy Linux
- Open source: Cộng đồng lớn, tài liệu phong phú

**Hạn chế:**
- Không emulate CPU/memory performance
- Tất cả chạy trên cùng kernel
- Không phù hợp test performance ở tải cao`,
    code: `# Các cách khởi động Mininet phổ biến:

# 1. Topology đơn giản (1 switch, 2 hosts)
$ sudo mn

# 2. Chỉ định số lượng host
$ sudo mn --topo single,4

# 3. Topology dạng cây
$ sudo mn --topo tree,depth=2,fanout=3

# 4. Topology tuyến tính
$ sudo mn --topo linear,4

# 5. Với remote controller và OpenFlow 1.3
$ sudo mn --topo tree,2,2 \\
  --controller remote,ip=127.0.0.1,port=6653 \\
  --switch ovsk,protocols=OpenFlow13 \\
  --link tc

# 6. Test nhanh kết nối
$ sudo mn --test pingall`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 't4',
    title: 'Các thành phần trong Mininet',
    category: 'Mininet',
    level: 'Cơ bản',
    content: `**1. Host (Máy tính ảo):**
- Là Linux process với network namespace riêng
- Có địa chỉ IP, routing table, ARP table độc lập
- Có thể chạy bất kỳ ứng dụng Linux nào (wget, iperf, nc...)

**2. Switch (OVS - Open vSwitch):**
- Software switch hỗ trợ OpenFlow 1.0 đến 1.5
- Kết nối với SDN Controller để nhận flow rules
- Có thể hoạt động standalone (không cần controller)

**3. Controller:**
- Não của mạng SDN
- Xử lý Packet-In, quyết định hành động, gửi Flow-Mod
- Có thể là POX, Ryu, ONOS, ODL hoặc custom

**4. Link:**
- Kết nối ảo giữa các node (veth pairs)
- TCLink: Cấu hình bandwidth, delay, packet loss
- Emulate WAN links, lossy networks

**5. Network Namespace:**
- Cô lập network stack của mỗi host
- Mỗi host có interface, routing, ARP riêng
- Lệnh: ip netns list để xem`,
    code: `# Làm việc với các thành phần trong Mininet CLI

# Xem tất cả nodes
mininet> nodes

# Xem topology
mininet> net

# Xem links
mininet> links

# Thực thi lệnh trên host h1
mininet> h1 ifconfig
mininet> h1 ping -c 3 h2
mininet> h1 python3 -m http.server 8080 &

# Xem thông tin switch
mininet> s1 ovs-vsctl show
mininet> s1 ovs-ofctl dump-flows s1
mininet> s1 ovs-ofctl dump-ports s1

# Mở terminal riêng cho host
mininet> xterm h1 h2

# Dump thông tin toàn bộ mạng
mininet> dump`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 't5',
    title: 'Luồng xử lý Packet trong SDN/OpenFlow',
    category: 'OpenFlow',
    level: 'Trung cấp',
    content: `**Reactive Flow Installation (Phản ứng):**

1. Host A gửi gói tin → Switch S1
2. Switch kiểm tra flow table → Không tìm thấy rule phù hợp (table-miss)
3. Switch encapsulate gói tin, gửi **Packet-In** lên Controller
4. Controller phân tích: src/dst MAC, IP, port...
5. Controller quyết định: forward, drop, modify...
6. Controller gửi **Flow-Mod** → Cài rule vào switch
7. Controller gửi **Packet-Out** → Chuyển tiếp gói hiện tại
8. Gói tin tiếp theo → Switch tự xử lý theo flow rule

**Proactive Flow Installation (Chủ động):**
- Controller cài flow rules ngay khi switch kết nối
- Không cần Packet-In cho mỗi flow mới
- Hiệu suất cao hơn, latency thấp hơn
- Phức tạp hơn trong thiết kế controller

**So sánh:**
- Reactive: Đơn giản, linh hoạt, latency cao lần đầu
- Proactive: Nhanh, phức tạp, cần biết trước traffic patterns`,
    code: `# Simulate luồng xử lý trong Mininet

# Terminal 1: Chạy Ryu với verbose logging
$ ryu-manager --verbose ryu.app.simple_switch_13

# Terminal 2: Khởi động Mininet
$ sudo mn --controller remote,port=6653 \\
  --switch ovsk,protocols=OpenFlow13

# Terminal 3: Quan sát flow table (trước khi ping)
$ watch -n 1 'sudo ovs-ofctl -O OpenFlow13 dump-flows s1'

# Mininet CLI: Thực hiện ping
mininet> h1 ping -c 1 h2

# Quan sát:
# 1. Ryu log: PacketIn received
# 2. Flow table: Flow entry được thêm
# 3. Ping thành công sau lần đầu (ARP học được)`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 't6',
    title: 'Network Topology trong Mininet',
    category: 'Mininet',
    level: 'Trung cấp',
    content: `**Built-in Topologies:**

**Single**: 1 switch kết nối N hosts - dùng cho test đơn giản
**Linear**: N switch kết nối thành chuỗi, mỗi switch có 1 host
**Tree**: Cây với depth và fanout tùy chỉnh - mô phỏng datacenter
**Torus/Custom**: Topology phức tạp tùy chỉnh

**Custom Topology với Python:**
- Kế thừa class Topo
- Override method build()
- Dùng addSwitch(), addHost(), addLink()
- Cấu hình link parameters qua TCLink

**Link Parameters quan trọng:**
- bw: Bandwidth (Mbps)
- delay: Delay ('5ms', '100ms')
- loss: Packet loss rate (%)
- max_queue_size: Buffer size (packets)
- jitter: Độ biến động delay`,
    code: `# custom_topology.py - Topology mạng doanh nghiệp

from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import OVSController, RemoteController
from mininet.link import TCLink
from mininet.log import setLogLevel
from mininet.cli import CLI

class EnterpriseTopo(Topo):
    """Mô phỏng mạng doanh nghiệp 3-tier"""
    
    def build(self):
        # Core switch (tier 1)
        core = self.addSwitch('s1')
        
        # Distribution switches (tier 2)
        dist1 = self.addSwitch('s2')
        dist2 = self.addSwitch('s3')
        
        # Access switches (tier 3)
        acc1 = self.addSwitch('s4')
        acc2 = self.addSwitch('s5')
        acc3 = self.addSwitch('s6')
        
        # End hosts
        for i in range(1, 3):
            h = self.addHost(f'h{i}', ip=f'10.0.1.{i}/24')
            self.addLink(h, acc1, bw=100, delay='1ms')
        for i in range(3, 5):
            h = self.addHost(f'h{i}', ip=f'10.0.2.{i-2}/24')
            self.addLink(h, acc2, bw=100, delay='1ms')
        for i in range(5, 7):
            h = self.addHost(f'h{i}', ip=f'10.0.3.{i-4}/24')
            self.addLink(h, acc3, bw=100, delay='1ms')
        
        # Connect tiers (uplinks with higher bandwidth)
        self.addLink(acc1, dist1, bw=1000, delay='0.5ms')
        self.addLink(acc2, dist1, bw=1000, delay='0.5ms')
        self.addLink(acc3, dist2, bw=1000, delay='0.5ms')
        self.addLink(dist1, core, bw=10000, delay='0.1ms')
        self.addLink(dist2, core, bw=10000, delay='0.1ms')

if __name__ == '__main__':
    setLogLevel('info')
    topo = EnterpriseTopo()
    net = Mininet(topo=topo, link=TCLink,
                  controller=OVSController)
    net.start()
    print("Enterprise topology ready!")
    net.pingAll()
    CLI(net)
    net.stop()`,
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
];

export const INITIAL_LABS = [
  {
    id: 'lab1',
    title: 'Lab 1: Làm quen với Mininet CLI',
    category: 'Cơ bản',
    level: 'Cơ bản',
    time: '30 phút',
    objectives: 'Khởi động Mininet với các topology khác nhau, sử dụng các lệnh cơ bản, kiểm tra kết nối, xem flow table.',
    steps: [
      {
        title: 'Khởi động và khám phá topology',
        code: `# Khởi động Mininet topology đơn giản
$ sudo mn --topo single,3 --controller default

# Trong Mininet CLI:
mininet> nodes        # Liệt kê tất cả nodes
mininet> links        # Liệt kê tất cả links
mininet> net          # Xem topology đầy đủ
mininet> dump         # Dump thông tin tất cả nodes
mininet> pingall      # Ping giữa tất cả hosts`,
      },
      {
        title: 'Kiểm tra kết nối',
        code: `# Ping từ h1 đến h2
mininet> h1 ping -c 5 h2

# Ping với interval và size tùy chỉnh
mininet> h1 ping -c 10 -i 0.2 -s 1000 h2

# Kiểm tra IP address
mininet> h1 ip addr show
mininet> h2 ifconfig

# Xem routing table
mininet> h1 route -n

# Xem ARP table
mininet> h1 arp -n`,
      },
      {
        title: 'Xem thông tin switch và flow table',
        code: `# Xem OVS switch info
mininet> s1 ovs-vsctl show

# Xem flow table (OpenFlow 1.0)
mininet> s1 ovs-ofctl dump-flows s1

# Xem port statistics
mininet> s1 ovs-ofctl dump-ports s1

# Xem port desc
mininet> s1 ovs-ofctl dump-ports-desc s1

# Xem switch features
mininet> s1 ovs-ofctl show s1`,
      },
      {
        title: 'Đo băng thông với iperf',
        code: `# Đo TCP bandwidth giữa h1 và h2
mininet> iperf h1 h2

# Đo UDP bandwidth
mininet> h2 iperf -u -s &
mininet> h1 iperf -u -c 10.0.0.2 -b 5M -t 10

# Dùng iperf3 (nếu có)
mininet> h2 iperf3 -s &
mininet> h1 iperf3 -c 10.0.0.2 -t 10 -J`,
      },
    ],
    notes: 'Chú ý: Luôn chạy sudo mn -c trước khi bắt đầu lab mới để cleanup state cũ.',
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'lab2',
    title: 'Lab 2: Tạo Custom Topology với Python',
    category: 'Cơ bản',
    level: 'Cơ bản',
    time: '45 phút',
    objectives: 'Viết script Python tạo topology tùy chỉnh, cấu hình TCLink với bandwidth/delay, chạy automated tests.',
    steps: [
      {
        title: 'Tạo topology Python cơ bản',
        code: `# File: my_topo.py
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.node import OVSController
from mininet.link import TCLink
from mininet.util import dumpNodeConnections
from mininet.log import setLogLevel

class RingTopo(Topo):
    """Topology dạng vòng: s1-s2-s3-s1"""
    
    def build(self, n=3):
        switches = []
        for i in range(1, n + 1):
            s = self.addSwitch(f's{i}')
            switches.append(s)
            # Thêm 2 hosts cho mỗi switch
            for j in range(1, 3):
                h = self.addHost(f'h{i}{j}',
                    ip=f'10.0.{i}.{j}/24')
                self.addLink(h, s, bw=100, delay='1ms')
        
        # Kết nối thành vòng
        for i in range(n):
            self.addLink(
                switches[i],
                switches[(i + 1) % n],
                bw=1000, delay='0.5ms'
            )

def run():
    setLogLevel('info')
    topo = RingTopo(n=3)
    net = Mininet(topo=topo, link=TCLink,
                  controller=OVSController)
    net.start()
    dumpNodeConnections(net.hosts)
    print("Testing network...")
    net.pingAll()
    net.iperf()
    net.stop()

if __name__ == '__main__':
    run()`,
      },
      {
        title: 'Chạy và kiểm tra',
        code: `# Chạy topology từ CLI
$ sudo mn --custom my_topo.py --topo ringtopo \\
  --link tc --controller default

# Hoặc chạy trực tiếp
$ sudo python3 my_topo.py

# Trong Mininet CLI kiểm tra:
mininet> net
mininet> pingall
mininet> iperf h11 h32`,
      },
    ],
    notes: 'Khi dùng TCLink, cần thêm --link tc khi chạy từ CLI. Với script Python thì truyền link=TCLink vào Mininet().',
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'lab3',
    title: 'Lab 3: Lập trình Ryu Controller - L2 Learning Switch',
    category: 'Nâng cao',
    level: 'Nâng cao',
    time: '90 phút',
    objectives: 'Viết Ryu controller app, hiểu OpenFlow event handling, implement MAC learning, cài đặt flow rules động.',
    steps: [
      {
        title: 'Ryu L2 Learning Switch đầy đủ',
        code: `# simple_switch_13.py
from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (
    CONFIG_DISPATCHER, MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet, ether_types

class SimpleSwitch13(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # MAC table: {dpid: {mac: port}}
        self.mac_to_port = {}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        """Khi switch kết nối, cài table-miss entry"""
        dp = ev.msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        
        # Table-miss: gửi tất cả lên controller
        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(
            ofp.OFPP_CONTROLLER,
            ofp.OFPCML_NO_BUFFER)]
        self._add_flow(dp, 0, match, actions)
        self.logger.info("Switch %016x connected", dp.id)

    def _add_flow(self, dp, priority, match,
                  actions, idle=0, hard=0):
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        inst = [parser.OFPInstructionActions(
            ofp.OFPIT_APPLY_ACTIONS, actions)]
        mod = parser.OFPFlowMod(
            datapath=dp, priority=priority,
            match=match, instructions=inst,
            idle_timeout=idle, hard_timeout=hard)
        dp.send_msg(mod)

    @set_ev_cls(ofp_event.EventOFPPacketIn,
                MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        dp = msg.datapath
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        in_port = msg.match['in_port']
        dpid = dp.id

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        
        if eth.ethertype == ether_types.ETH_TYPE_LLDP:
            return

        dst, src = eth.dst, eth.src
        
        # Học MAC address
        self.mac_to_port.setdefault(dpid, {})
        self.mac_to_port[dpid][src] = in_port
        self.logger.info(
            "DPID=%s IN_PORT=%s SRC=%s DST=%s",
            dpid, in_port, src, dst)
        
        # Quyết định output port
        if dst in self.mac_to_port[dpid]:
            out_port = self.mac_to_port[dpid][dst]
        else:
            out_port = ofp.OFPP_FLOOD
        
        actions = [parser.OFPActionOutput(out_port)]
        
        # Cài flow rule nếu biết đích
        if out_port != ofp.OFPP_FLOOD:
            match = parser.OFPMatch(
                in_port=in_port,
                eth_dst=dst, eth_src=src)
            self._add_flow(dp, 1, match, actions,
                          idle=20, hard=60)
        
        # Gửi packet out
        data = (msg.data 
                if msg.buffer_id == ofp.OFP_NO_BUFFER 
                else None)
        out = parser.OFPPacketOut(
            datapath=dp,
            buffer_id=msg.buffer_id,
            in_port=in_port,
            actions=actions, data=data)
        dp.send_msg(out)`,
      },
      {
        title: 'Chạy và kiểm tra',
        code: `# Terminal 1: Khởi động Ryu
$ ryu-manager --verbose simple_switch_13.py

# Terminal 2: Khởi động Mininet
$ sudo mn --topo tree,2,2 \\
  --controller remote,ip=127.0.0.1,port=6653 \\
  --switch ovsk,protocols=OpenFlow13

# Kiểm tra flow table sau khi ping:
mininet> h1 ping -c 3 h4
mininet> s1 ovs-ofctl -O OpenFlow13 dump-flows s1

# Quan sát MAC table trong Ryu log`,
      },
    ],
    notes: 'Ryu sử dụng port 6653 mặc định cho OpenFlow 1.3. Đảm bảo Mininet kết nối đúng port.',
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'lab4',
    title: 'Lab 4: SDN Firewall với Ryu',
    category: 'Nâng cao',
    level: 'Nâng cao',
    time: '120 phút',
    objectives: 'Implement stateless packet filtering, chặn/cho phép traffic theo port và IP, cài đặt flow rules firewall.',
    steps: [
      {
        title: 'SDN Firewall App',
        code: `# sdn_firewall.py
from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import (
    CONFIG_DISPATCHER, MAIN_DISPATCHER, set_ev_cls)
from ryu.ofproto import ofproto_v1_3

class SDNFirewall(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    # Firewall policy rules
    # Priority cao hơn = xét trước
    POLICIES = [
        # DENY rules (priority 200 - xét trước)
        {'match': {'eth_type': 0x0800, 'ip_proto': 6,
                   'tcp_dst': 23}, 'action': 'deny',
         'desc': 'Block Telnet'},
        {'match': {'eth_type': 0x0800, 'ip_proto': 6,
                   'tcp_dst': 21}, 'action': 'deny',
         'desc': 'Block FTP'},
        {'match': {'eth_type': 0x0800,
                   'ipv4_src': '10.0.0.99'},
         'action': 'deny', 'desc': 'Block bad host'},
        
        # ALLOW rules (priority 100)
        {'match': {'eth_type': 0x0800, 'ip_proto': 6,
                   'tcp_dst': 80}, 'action': 'allow',
         'desc': 'Allow HTTP'},
        {'match': {'eth_type': 0x0800, 'ip_proto': 6,
                   'tcp_dst': 443}, 'action': 'allow',
         'desc': 'Allow HTTPS'},
        {'match': {'eth_type': 0x0800, 'ip_proto': 6,
                   'tcp_dst': 22}, 'action': 'allow',
         'desc': 'Allow SSH'},
        {'match': {'eth_type': 0x0806},
         'action': 'allow', 'desc': 'Allow ARP'},
        {'match': {'eth_type': 0x0800, 'ip_proto': 1},
         'action': 'allow', 'desc': 'Allow ICMP'},
    ]

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures,
                CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        dp = ev.msg.datapath
        parser = dp.ofproto_parser
        ofp = dp.ofproto
        
        # Default deny all
        match = parser.OFPMatch()
        self._add_flow(dp, 0, match, [])
        self.logger.info("Default DENY ALL installed")
        
        # Install policy rules
        for policy in self.POLICIES:
            match = parser.OFPMatch(**policy['match'])
            if policy['action'] == 'allow':
                actions = [parser.OFPActionOutput(
                    ofp.OFPP_NORMAL)]
                priority = 100
            else:
                actions = []
                priority = 200
            self._add_flow(dp, priority, match, actions)
            self.logger.info(
                "Policy: %s [%s]",
                policy['desc'], policy['action'].upper())

    def _add_flow(self, dp, priority, match, actions):
        ofp = dp.ofproto
        parser = dp.ofproto_parser
        inst = [parser.OFPInstructionActions(
            ofp.OFPIT_APPLY_ACTIONS, actions)]
        mod = parser.OFPFlowMod(
            datapath=dp, priority=priority,
            match=match, instructions=inst)
        dp.send_msg(mod)`,
      },
      {
        title: 'Test Firewall Rules',
        code: `# Chạy firewall controller
$ ryu-manager sdn_firewall.py

# Khởi động Mininet
$ sudo mn --topo single,3 \\
  --controller remote,port=6653 \\
  --switch ovsk,protocols=OpenFlow13

# Test ICMP (nên thành công)
mininet> h1 ping -c 3 h2

# Test HTTP (nên thành công)
mininet> h2 python3 -m http.server 80 &
mininet> h1 wget -qO- http://10.0.0.2:80

# Test Telnet (nên bị block)
mininet> h1 telnet 10.0.0.2 23

# Xem flow table
mininet> s1 ovs-ofctl -O OpenFlow13 dump-flows s1

# Xem thống kê (n_packets)
mininet> s1 ovs-ofctl -O OpenFlow13 dump-flows s1 \\
  | grep "n_packets=[^0]"`,
      },
    ],
    notes: 'Thứ tự priority rất quan trọng. Deny rules cần priority cao hơn allow rules để được xét trước.',
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
];

export const INITIAL_QUIZ = [
  { id: 'q1', question: 'SDN viết tắt của từ gì?', options: ['Software Defined Networking', 'System Design Network', 'Scalable Dynamic Network', 'Secure Data Network'], correct: 0, explain: 'SDN = Software Defined Networking - Mạng được định nghĩa bởi phần mềm, tách control plane khỏi data plane.', category: 'Khái niệm', difficulty: 'Dễ' },
  { id: 'q2', question: 'Trong SDN, Control Plane và Data Plane được:', options: ['Tích hợp trong mỗi thiết bị', 'Tách biệt hoàn toàn', 'Chạy song song trên cùng thiết bị', 'Không liên quan đến nhau'], correct: 1, explain: 'Đặc điểm cốt lõi của SDN là tách biệt control plane (điều khiển logic) và data plane (chuyển tiếp gói tin).', category: 'Kiến trúc', difficulty: 'Dễ' },
  { id: 'q3', question: 'OpenFlow là gì?', options: ['Một loại switch mạng vật lý', 'Giao thức giao tiếp giữa SDN controller và switch', 'Phần mềm quản lý mạng', 'Ngôn ngữ lập trình mạng'], correct: 1, explain: 'OpenFlow là giao thức chuẩn southbound API cho phép SDN controller giao tiếp và điều khiển các switch.', category: 'OpenFlow', difficulty: 'Dễ' },
  { id: 'q4', question: 'Mininet là gì?', options: ['Phần cứng switch nhỏ gọn', 'SDN Controller framework', 'Network emulator chạy trên Linux', 'Giao thức định tuyến mới'], correct: 2, explain: 'Mininet là network emulator tạo mạng ảo hoàn chỉnh (hosts, switches, links) trên một máy Linux.', category: 'Mininet', difficulty: 'Dễ' },
  { id: 'q5', question: 'Lệnh nào dùng để kiểm tra kết nối giữa tất cả hosts trong Mininet?', options: ['mininet> ping all', 'mininet> pingall', 'mininet> test ping', 'mininet> check connectivity'], correct: 1, explain: "'pingall' là lệnh trong Mininet CLI kiểm tra ping giữa tất cả các cặp host trong topology.", category: 'Mininet', difficulty: 'Dễ' },
  { id: 'q6', question: 'OVS là viết tắt của?', options: ['Open Virtual Switch', 'Open vSwitch', 'Optimized Virtual Switching', 'Online VPN Switch'], correct: 1, explain: 'OVS = Open vSwitch, software switch open source hỗ trợ OpenFlow, thường dùng trong Mininet.', category: 'Mininet', difficulty: 'Dễ' },
  { id: 'q7', question: 'Packet-In message được gửi từ đâu đến đâu?', options: ['Controller → Switch', 'Host → Switch', 'Switch → Controller', 'Controller → Host'], correct: 2, explain: 'Khi switch nhận gói tin không khớp flow table (table-miss), nó gửi Packet-In lên Controller để xử lý.', category: 'OpenFlow', difficulty: 'Trung bình' },
  { id: 'q8', question: 'Flow-Mod message được dùng để làm gì?', options: ['Gửi gói tin từ controller xuống switch', 'Thêm/sửa/xóa flow rules trong switch', 'Thông báo switch đã kết nối', 'Yêu cầu thống kê từ switch'], correct: 1, explain: 'Flow-Mod message được Controller gửi đến Switch để thêm, sửa, hoặc xóa flow entries trong flow table.', category: 'OpenFlow', difficulty: 'Trung bình' },
  { id: 'q9', question: 'Lệnh nào tạo Mininet topology cây với depth=2, fanout=3?', options: ['sudo mn --topo tree,2,3', 'sudo mn --topo tree,depth=2,fanout=3', 'sudo mn --tree 2 3', 'Cả A và B đều đúng'], correct: 3, explain: 'Cả hai cú pháp đều hợp lệ: --topo tree,2,3 hoặc --topo tree,depth=2,fanout=3.', category: 'Mininet', difficulty: 'Trung bình' },
  { id: 'q10', question: 'Default port của OpenFlow controller (OF 1.3+) là?', options: ['6633', '6653', '8080', '4443'], correct: 1, explain: 'OpenFlow 1.3+ dùng port 6653 (IANA registered). Port 6633 là port cũ cho OF 1.0-1.2.', category: 'OpenFlow', difficulty: 'Trung bình' },
  { id: 'q11', question: 'Lệnh xem flow table của switch s1 trong Mininet là?', options: ['s1 show flows', 's1 ovs-ofctl dump-flows s1', 's1 flow-table show', 'ovs-vsctl dump-flows s1'], correct: 1, explain: "Dùng 'ovs-ofctl dump-flows <tên_switch>' để xem flow table của OVS switch.", category: 'Mininet', difficulty: 'Trung bình' },
  { id: 'q12', question: 'Trong Ryu, @set_ev_cls decorator dùng để làm gì?', options: ['Định nghĩa class controller mới', 'Đăng ký event handler cho OpenFlow events', 'Cấu hình kết nối controller', 'Tạo REST API endpoint'], correct: 1, explain: '@set_ev_cls đăng ký một method như event handler để xử lý các OpenFlow events cụ thể (PacketIn, SwitchFeatures...).', category: 'Ryu', difficulty: 'Khó' },
  { id: 'q13', question: 'OFPP_FLOOD trong OpenFlow có nghĩa là?', options: ['Drop gói tin ngay lập tức', 'Gửi lên controller', 'Chuyển tiếp ra tất cả ports trừ input port', 'Broadcast trong VLAN'], correct: 2, explain: 'OFPP_FLOOD là special port, gửi gói tin ra tất cả ports trong VLAN ngoại trừ port nhận vào (in_port).', category: 'OpenFlow', difficulty: 'Khó' },
  { id: 'q14', question: 'TCLink trong Mininet dùng để làm gì?', options: ['Tạo TCP connections giữa hosts', 'Cấu hình bandwidth, delay, loss cho links', 'Kiểm soát traffic security', 'Kết nối với external network'], correct: 1, explain: 'TCLink sử dụng Linux Traffic Control (tc/netem) để cấu hình QoS: bandwidth, delay, packet loss cho links.', category: 'Mininet', difficulty: 'Trung bình' },
  { id: 'q15', question: 'Lệnh nào đo băng thông TCP giữa h1 và h2 trong Mininet?', options: ['mininet> iperf h1 h2', 'mininet> h1 iperf -c h2', 'mininet> bandwidth h1 h2', 'mininet> test bw h1 h2'], correct: 0, explain: "Lệnh 'iperf h1 h2' tự động chạy iperf server trên h2 và client trên h1, đo TCP throughput.", category: 'Mininet', difficulty: 'Trung bình' },
  { id: 'q16', question: 'Công cụ nào dùng để bắt và phân tích OpenFlow packets?', options: ['netstat', 'Wireshark với filter openflow_v4', 'ifconfig', 'nmap'], correct: 1, explain: 'Wireshark hỗ trợ dissect OpenFlow protocol. Dùng filter "openflow_v4" hoặc "openflow_v1" để xem các messages.', category: 'Debug', difficulty: 'Trung bình' },
];

export const INITIAL_GUIDES = [
  {
    id: 'g1',
    question: 'Mininet không khởi động, báo lỗi "Error: Please shut down the controller which is running on port 6653"?',
    answer: `Nguyên nhân: Có controller process cũ đang chạy. Giải pháp:

1. Cleanup Mininet state: sudo mn -c
2. Kill process chiếm port: sudo fuser -k 6653/tcp (hoặc 6633/tcp)
3. Restart OVS service: sudo service openvswitch-switch restart
4. Thử lại: sudo mn --topo minimal

Nếu vẫn lỗi, kiểm tra: sudo netstat -tlnp | grep 665`,
    category: 'Cài đặt',
    tags: ['error', 'startup', 'port'],
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'g2',
    question: 'Ping giữa các hosts thất bại mặc dù topology đúng?',
    answer: `Kiểm tra theo thứ tự:

1. Controller có đang chạy không?
   $ ryu-manager simple_switch_13.py (phải thấy "Switch connected")

2. OVS kết nối với controller chưa?
   $ sudo ovs-vsctl show (tìm "is_connected: true")

3. Xem flow table có rules không?
   mininet> s1 ovs-ofctl dump-flows s1

4. Thử dùng default controller trước:
   $ sudo mn --controller default

5. Kiểm tra firewall host không block:
   $ sudo ufw status`,
    category: 'Kết nối',
    tags: ['ping', 'connectivity', 'flow'],
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'g3',
    question: 'Làm sao debug OpenFlow messages giữa controller và switch?',
    answer: `Nhiều phương pháp:

1. Ryu verbose logging:
   $ ryu-manager --verbose app.py
   → In chi tiết mọi OpenFlow event

2. Wireshark capture:
   $ sudo wireshark (filter: openflow_v4)
   Bắt trên lo interface vì controller/switch cùng máy

3. tcpdump:
   $ sudo tcpdump -i lo -n port 6653 -w /tmp/of.pcap

4. OVS debug log:
   $ sudo ovs-appctl vlog/set dbg

5. Mininet sniffer:
   mininet> s1 ovs-ofctl snoop s1`,
    category: 'Debug',
    tags: ['debug', 'wireshark', 'openflow'],
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'g4',
    question: 'Ryu controller crash với "Address already in use" error?',
    answer: `Port 6653 đang bị occupied bởi process khác:

1. Tìm process đang dùng port:
   $ sudo lsof -i :6653
   $ sudo netstat -tlnp | grep 6653

2. Kill process đó:
   $ sudo kill -9 <PID>

3. Hoặc đổi port cho Ryu:
   $ ryu-manager --ofp-tcp-listen-port 6654 app.py

4. Cập nhật Mininet để dùng port mới:
   $ sudo mn --controller remote,ip=127.0.0.1,port=6654`,
    category: 'Ryu',
    tags: ['ryu', 'port', 'error'],
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
  {
    id: 'g5',
    question: 'Làm sao measure performance thực của mạng SDN?',
    answer: `Công cụ đo performance trong Mininet:

1. iperf/iperf3 (TCP/UDP throughput):
   mininet> h2 iperf3 -s &
   mininet> h1 iperf3 -c 10.0.0.2 -t 30 -J

2. ping (latency & jitter):
   mininet> h1 ping -c 100 -i 0.01 h2

3. hping3 (custom packets):
   mininet> h1 hping3 -S -p 80 -c 100 h2

4. netperf (comprehensive):
   mininet> h2 netserver &
   mininet> h1 netperf -H 10.0.0.2 -l 30

5. bwm-ng (real-time bandwidth):
   mininet> h1 bwm-ng -i eth0`,
    category: 'Performance',
    tags: ['iperf', 'performance', 'measurement'],
    author: 'Phúc Trần',
    createdAt: '2024-01-01',
  },
];
