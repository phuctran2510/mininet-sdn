import { useState } from 'react'
import { PageHdr, Diff } from '../components/UI'

const EXAMS = [
  {
    id:'e1', title:'Giữa kỳ — Lý thuyết', duration:'45 phút', points:10,
    badge:'b-blue', type:'Tự luận',
    desc:'Kiểm tra hiểu biết về SDN, OpenFlow, Mininet cơ bản',
    qs:[
      { n:1, pts:2, q:'Câu 1 (2đ): Kiến trúc SDN', body:'Giải thích kiến trúc 3 tầng của SDN. Vẽ sơ đồ minh họa và mô tả rõ vai trò của:\n- Application Layer\n- Control Layer (SDN Controller)\n- Infrastructure Layer (Data Plane)\n\nNêu sự khác biệt giữa Northbound API và Southbound API. Cho ví dụ cụ thể.' },
      { n:2, pts:2, q:'Câu 2 (2đ): Mininet Internals', body:'Mininet sử dụng những cơ chế nào của Linux kernel để tạo mạng ảo?\n\nSo sánh Mininet với:\n(a) Virtual Machine (VMware/VirtualBox)\n(b) Docker Container\n\nVề: isolation, performance, resource usage, use case.' },
      { n:3, pts:3, q:'Câu 3 (3đ): OpenFlow Packet Processing', body:'Mô tả chi tiết quá trình xử lý một gói tin trong OpenFlow switch từ khi nhận đến khi forward.\n\nVẽ flow diagram cho 2 trường hợp:\n- TH1: Packet khớp với flow entry có sẵn\n- TH2: Packet không khớp rule nào (table-miss)\n\nGiải thích tại sao cần cài đặt table-miss flow entry.' },
      { n:4, pts:3, q:'Câu 4 (3đ): So sánh SDN Controllers', body:'So sánh 3 SDN Controller: Ryu, ONOS, OpenDaylight theo:\n- Ngôn ngữ lập trình\n- Kiến trúc\n- Use case phù hợp\n- Khả năng mở rộng\n- Cộng đồng & tài liệu\n\nĐề xuất controller phù hợp cho:\n(a) Học tập/nghiên cứu cá nhân\n(b) Enterprise campus network\n(c) Telco/carrier-grade network\n\nGiải thích lý do chọn.' },
    ]
  },
  {
    id:'e2', title:'Cuối kỳ — Thực hành', duration:'90 phút', points:10,
    badge:'b-pur', type:'Thực hành',
    desc:'Triển khai SDN topology và viết Ryu controller thực tế',
    qs:[
      { n:1, pts:2.5, q:'Câu 1 (2.5đ): Topology', body:'Tạo 2-tier data center topology bằng Mininet Python API:\n- 2 core switch, 4 aggregation switch, 8 edge switch\n- Mỗi edge switch kết nối 3 hosts (tổng 24 hosts)\n- Bandwidth: Core-Agg: 10Gbps, Agg-Edge: 1Gbps, Edge-Host: 100Mbps\n- Delay: Core-Agg: 1ms, Agg-Edge: 2ms\n\nVerify: pingall 0% dropped. Nộp: topology.py + output pingall.' },
      { n:2, pts:3.5, q:'Câu 2 (3.5đ): SDN Controller', body:'Viết Ryu controller (l2_controller.py) với các tính năng:\n\n1. L2 Learning Switch: MAC learning, unicast forwarding, idle_timeout=60, hard_timeout=300\n\n2. ACL Rules:\n   - Chặn traffic từ VLAN 10 sang VLAN 20 (one-way block)\n   - Cho phép ICMP từ tất cả, chặn TCP port 23 (Telnet)\n\n3. QoS cơ bản:\n   - Guaranteed bandwidth 10Mbps/host bằng HTB queues\n   - Ưu tiên ICMP > TCP > UDP\n\n4. Logging: Ghi mọi Packet-In với timestamp, src/dst MAC, action thực hiện.' },
      { n:3, pts:2.5, q:'Câu 3 (2.5đ): Test & Verify', body:'Viết test script (test_network.py) tự động kiểm tra:\n\n1. Connectivity test: pingall và ghi kết quả ra file\n2. ACL verification: kiểm tra VLAN isolation hoạt động đúng\n3. Bandwidth test: iperf3 đo bandwidth giữa các cặp host\n4. Failover test: ngắt 1 link, chờ 5s, kiểm tra traffic có reroute\n\nScript phải in report rõ ràng: PASS/FAIL cho từng test.' },
      { n:4, pts:1.5, q:'Câu 4 (1.5đ): Báo cáo kỹ thuật', body:'Viết báo cáo ngắn (1-2 trang) bao gồm:\n\n1. Sơ đồ topology (ASCII art hoặc vẽ tay scan)\n2. Phân tích 5 flow entries quan trọng nhất trong flow table\n3. Kết quả test bandwidth (bảng so sánh các cặp host)\n4. Nhận xét: bottleneck ở đâu? Đề xuất cải tiến?\n5. Khó khăn gặp phải và cách giải quyết' },
    ]
  },
  {
    id:'e3', title:'Đề thi tổng hợp — Mini Project', duration:'3 ngày', points:10,
    badge:'b-org', type:'Take-home',
    desc:'Bài thi về nhà — triển khai hệ thống SDN hoàn chỉnh',
    qs:[
      { n:1, pts:4, q:'Phần 1 (4đ): Thiết kế & Triển khai', body:'Thiết kế và cài đặt mạng SDN cho một văn phòng nhỏ:\n\n- 3 phòng ban: IT (VLAN 10), Kế toán (VLAN 20), Nhân sự (VLAN 30)\n- Mỗi phòng: 4 hosts + 1 server\n- Yêu cầu bảo mật: Kế toán và Nhân sự không thể giao tiếp trực tiếp\n- IT có thể truy cập tất cả\n- Server của mỗi phòng chỉ phục vụ phòng đó + IT\n\nNộp: topo.py, controller.py, policy_config.json' },
      { n:2, pts:3, q:'Phần 2 (3đ): Monitoring & Dashboard', body:'Xây dựng monitoring system:\n\n1. Thu thập flow statistics mỗi 5 giây từ tất cả switch\n2. Phát hiện bất thường: host gửi > 1000 pkt/s → alert\n3. Flask web dashboard hiển thị:\n   - Topology map (SVG/Canvas)\n   - Traffic chart theo thời gian thực\n   - Alert log\n4. REST API: GET /api/flows, GET /api/topology, POST /api/block/{ip}\n\nNộp: monitor.py, dashboard.py, templates/' },
      { n:3, pts:3, q:'Phần 3 (3đ): Báo cáo & Thuyết trình', body:'Báo cáo kỹ thuật đầy đủ:\n\n1. Executive Summary (1/2 trang): mục tiêu, kết quả đạt được\n2. Kiến trúc hệ thống: sơ đồ, giải thích thiết kế\n3. Hướng dẫn cài đặt step-by-step\n4. Kết quả kiểm thử: screenshots, logs, benchmark\n5. Phân tích bảo mật: điểm mạnh/yếu, đề xuất cải thiện\n6. Demo video 5 phút (tùy chọn, +0.5đ)\n\nFormat: PDF, tối thiểu 8 trang, tối đa 15 trang.' },
    ]
  },
]

export default function Exam() {
  const [sel, setSel] = useState(null)
  const [openQ, setOpenQ] = useState(null)

  if (sel) {
    const ex = EXAMS.find(e => e.id === sel)
    return (
      <div className="fu">
        <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
          <button className="btn bg" onClick={() => { setSel(null); setOpenQ(null) }}>← Danh sách đề</button>
          <span style={{color:'var(--txt3)',fontSize:'.8rem'}}>/ {ex.title}</span>
        </div>
        <div className="card" style={{padding:'1.2rem',marginBottom:'1.2rem',background:`rgba(0,212,255,.04)`,borderColor:'rgba(0,212,255,.2)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.7rem',flexWrap:'wrap',marginBottom:'.5rem'}}>
            <span className={`badge ${ex.badge}`}>{ex.type}</span>
            <span style={{fontSize:'.78rem',color:'var(--txt3)'}}>⏱ {ex.duration}</span>
            <span style={{fontSize:'.78rem',color:'var(--txt3)'}}>📊 {ex.points} điểm tổng</span>
          </div>
          <h2 style={{fontFamily:'var(--fm)',fontSize:'1.2rem',color:'var(--txt)',marginBottom:'.3rem'}}>{ex.title}</h2>
          <p style={{fontSize:'.84rem',color:'var(--txt2)'}}>{ex.desc}</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'.75rem'}}>
          {ex.qs.map(q => (
            <div key={q.n} className="card" style={{overflow:'hidden'}}>
              <div
                onClick={() => setOpenQ(openQ === q.n ? null : q.n)}
                style={{
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                  padding:'1rem 1.2rem',cursor:'pointer',gap:'1rem',
                  background: openQ===q.n ? 'rgba(0,212,255,.04)' : 'transparent',
                }}
              >
                <div style={{display:'flex',alignItems:'center',gap:'.7rem',flex:1,minWidth:0}}>
                  <div style={{width:28,height:28,borderRadius:6,background:'rgba(0,212,255,.12)',color:'var(--acc)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fc)',fontWeight:700,fontSize:'.8rem',flexShrink:0}}>{q.n}</div>
                  <div>
                    <div style={{fontSize:'.86rem',fontWeight:600,color:'var(--txt)'}}>{q.q}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'.7rem',flexShrink:0}}>
                  <span style={{fontSize:'.78rem',color:'var(--grn)',fontFamily:'var(--fc)',fontWeight:700}}>{q.pts}đ</span>
                  <span style={{color:'var(--txt3)',fontSize:'.8rem'}}>{openQ===q.n?'▾':'▸'}</span>
                </div>
              </div>
              {openQ===q.n && (
                <div style={{borderTop:'1px solid var(--brd)',padding:'1rem 1.2rem',background:'rgba(0,0,0,.15)'}}>
                  <pre style={{background:'transparent',border:'none',borderLeft:'3px solid var(--acc2)',padding:'.6rem .9rem',margin:0,fontSize:'.82rem',lineHeight:1.8,color:'var(--txt2)',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>
                    {q.body}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fu">
      <PageHdr icon="📝" title="Đề thi mẫu" sub="3 dạng đề — lý thuyết, thực hành và take-home project"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(320px,100%),1fr))',gap:'1rem'}} className="resp-grid-2">
        {EXAMS.map(ex => (
          <div key={ex.id} className="card cg" style={{padding:'1.3rem',cursor:'pointer'}} onClick={() => setSel(ex.id)}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'.7rem',flexWrap:'wrap',gap:'.4rem'}}>
              <span className={`badge ${ex.badge}`}>{ex.type}</span>
              <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>⏱ {ex.duration}</span>
            </div>
            <h3 style={{fontFamily:'var(--fm)',fontSize:'1rem',color:'var(--txt)',marginBottom:'.4rem'}}>{ex.title}</h3>
            <p style={{fontSize:'.82rem',color:'var(--txt2)',marginBottom:'1rem',lineHeight:1.5}}>{ex.desc}</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'.78rem',color:'var(--txt3)'}}>{ex.qs.length} câu hỏi</span>
              <span style={{fontSize:'.82rem',color:'var(--grn)',fontWeight:700,fontFamily:'var(--fc)'}}>{ex.points} điểm</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:'1.2rem',marginTop:'1.5rem',background:'rgba(255,171,64,.04)',borderColor:'rgba(255,171,64,.2)'}}>
        <div style={{fontWeight:600,color:'var(--org)',marginBottom:'.5rem',fontSize:'.9rem'}}>📋 Hướng dẫn chung khi làm bài</div>
        <ul className="ul">
          <li>Đọc kỹ đề, phân bổ thời gian theo điểm số từng câu</li>
          <li>Code phải có comment, dễ đọc, đúng indentation</li>
          <li>Nộp đúng định dạng được yêu cầu (py, pdf, zip...)</li>
          <li>Đặt tên file: <code>MSSV_TenSV_LoaiBai.zip</code></li>
          <li>Câu thực hành: screenshot terminal chứng minh kết quả</li>
          <li>Plagiarism sẽ bị 0 điểm toàn bộ bài thi</li>
        </ul>
      </div>
    </div>
  )
}
