import React, { useState } from 'react';
import { 
  Search, Bell, User, Bookmark, TrendingUp, Sparkles, ChevronRight, 
  ArrowUpRight, Heart, ShoppingBag, Receipt, LineChart, BarChart3, LayoutGrid, X, Flame
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [likedBrands, setLikedBrands] = useState(['스타벅스', '나이키', '올리브영', '무신사']);
  const [alerts, setAlerts] = useState({
    product: true,
    earnings: true,
    report: true
  });

  const toggleBrandLike = (brandName) => {
    if (likedBrands.includes(brandName)) {
      setLikedBrands(likedBrands.filter(b => b !== brandName));
    } else {
      setLikedBrands([...likedBrands, brandName]);
    }
  };

  const toggleAlert = (key) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 font-sans p-0 sm:p-4">
      {/* 모바일 컨테이너 */}
      <div className="w-full max-w-[430px] h-[932px] bg-slate-50 flex flex-col shadow-2xl rounded-none sm:rounded-[40px] overflow-hidden relative border-0 sm:border-[8px] border-slate-800">
        
        {/* 상단 헤더 */}
        <header className="bg-white px-5 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium leading-none">00증권</span>
              <span className="text-base font-extrabold tracking-tight text-slate-800 leading-tight">TrendFolio</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setActiveTab('mypage')}
              className={`p-1 rounded-full transition-colors ${activeTab === 'mypage' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 본문 영역 */}
        <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          
          {/* 1. 홈 탭 */}
          {activeTab === 'home' && (
            <div className="p-4 space-y-5">
              <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-100/60 px-2 py-0.5 rounded-full">LIFESTYLE TO WEALTH</span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1">요즘 다들 <span className="text-indigo-600">뭐 사지?</span></h2>
                    <p className="text-xs text-slate-500 mt-0.5">실시간 소비 레이더</p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 relative">
                  <input 
                    type="text" 
                    placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-16 text-xs shadow-sm focus:outline-none focus:border-indigo-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button className="absolute right-1.5 top-1.5 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                    발견 →
                  </button>
                </div>

                <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 text-[11px] text-slate-500">
                  <span className="shrink-0 text-slate-400">최근 본</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">#메가커피</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">#삼양식품</span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">#아모레퍼시픽</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-500" /> 실시간 급상승 소비 트렌드
                  </h3>
                  <span className="text-[11px] text-indigo-600 font-semibold">LIVE NOW</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="w-52 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="h-28 bg-slate-200 relative">
                      <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="간식" />
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">2030 오픈런 간식 1위</span>
                      <span className="absolute bottom-2 right-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">+420%</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-slate-800 truncate">달콤바삭 끝판왕! 빠리바게트 초코...</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
                    </div>
                  </div>

                  <div className="w-52 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="h-28 bg-slate-200 relative">
                      <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=60" className="w-full h-full object-cover" alt="뷰티" />
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">세일 완판</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-slate-800 truncate">올리브영 단독 론칭 글루타치온</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">실리콘투 · 코스맥스 연관 공급망 수혜</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. 내 소비 탭 */}
          {activeTab === 'spending' && (
            <div className="p-4 space-y-5">
              <div className="bg-slate-100 px-3.5 py-2 rounded-xl text-slate-600 text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> 신한·현대카드 등 3개 카드사 및 페이 연동 완료</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Receipt className="w-4 h-4" /></div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">최근 한달 카테고리별 소비 분석</h3>
                    <p className="text-[10px] text-slate-400">카드·페이 실결제 312건 전수 데이터 마이데이터 정밀 분석</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-slate-500">총 소비 누적액</span>
                    <span className="text-xs font-bold text-rose-500">↑직전 월 대비 +8.4%</span>
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-1">1,842,000 <span className="text-sm font-normal">원</span></div>
                </div>

                <div className="space-y-1.5">
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="bg-indigo-500 h-full" style={{ width: '38%' }}></div>
                    <div className="bg-pink-400 h-full" style={{ width: '29%' }}></div>
                    <div className="bg-emerald-400 h-full" style={{ width: '21%' }}></div>
                    <div className="bg-slate-400 h-full" style={{ width: '12%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> 식음료</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400"></span> 패션·뷰티</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> 리빙·편의</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> 콘텐츠</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. 주식 트렌드 탭 */}
          {activeTab === 'trend' && (
            <div className="p-4 space-y-5">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">📈 소비자 버즈 급상승 1위</span>
                <h3 className="font-extrabold text-base text-slate-900 leading-snug">품절 대란 'K-글루타치온 젤리'와 이너뷰티 급상승</h3>
                <button 
                  onClick={() => setActiveTab('invest')}
                  className="w-full bg-indigo-600 text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-1"
                >
                  연관 기업 '에이피알' 투자정보 분석 보기 <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 4. 투자정보 탭 */}
          {activeTab === 'invest' && (
            <div className="p-4 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">KOSPI 278470</span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1">에이피알 (APR)</h2>
                  </div>
                  <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-slate-900">52,400 <span className="text-base font-normal">원</span> <span className="text-xs font-bold text-rose-500">▲+2.1%</span></div>
              </div>
            </div>
          )}

          {/* 5. My Page 탭 */}
          {activeTab === 'mypage' && (
            <div className="p-4 space-y-5">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-lg font-extrabold text-slate-900">백보경님</h2>
                <p className="text-xs text-slate-400 mt-0.5">초보 투자자 2개월차</p>
              </div>
            </div>
          )}

        </main>

        {/* 하단 탭 네비게이션 */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-3 py-2 flex justify-around items-center z-30">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] ${activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
            <LayoutGrid className="w-5 h-5" />홈
          </button>
          <button onClick={() => setActiveTab('spending')} className={`flex flex-col items-center text-[10px] ${activeTab === 'spending' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
            <Receipt className="w-5 h-5" />내 소비
          </button>
          <button onClick={() => setActiveTab('trend')} className={`flex flex-col items-center text-[10px] ${activeTab === 'trend' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
            <LineChart className="w-5 h-5" />주식 트렌드
          </button>
          <button onClick={() => setActiveTab('invest')} className={`flex flex-col items-center text-[10px] ${activeTab === 'invest' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
            <BarChart3 className="w-5 h-5" />투자정보
          </button>
        </nav>

      </div>
    </div>
  );
}