import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, Bell, User, ShoppingBag, TrendingUp, Sparkles, 
  ChevronRight, Heart, Bookmark, ArrowUpRight, MessageSquare,
  Home, CreditCard, LineChart, PieChart, Check, X,
  Shield, Settings, Clock, ChevronLeft, Lock
} from 'lucide-react';

// Vercel Environment Variables에서 키값을 가져옵니다.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 💡 선택한 이슈의 '의견 남기기' 모달 상태 관리
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [likedBrands, setLikedBrands] = useState(['스타벅스', '나이키', '올리브영', '무신사']);

  const toggleLike = (brandName) => {
    if (likedBrands.includes(brandName)) {
      setLikedBrands(likedBrands.filter(b => b !== brandName));
    } else {
      setLikedBrands([...likedBrands, brandName]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-20 font-sans text-slate-800 relative shadow-xl">
      {/* 💡 의견 남기기 화면이 선택되었을 때 최우선으로 렌더링 */}
      {selectedIssue ? (
        <CommentView 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      ) : isSearchOpen ? (
        <SearchView 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          {/* Header */}
          <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 px-4 py-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              {activeTab === 'myPage' ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab('home')} className="p-1 -ml-1 text-slate-700">
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-lg font-bold text-slate-900">My Page</span>
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-semibold block leading-none">00증권</span>
                    <span className="text-base font-bold text-slate-900 leading-none">TrendFolio</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              {activeTab !== 'myPage' && (
                <>
                  <button onClick={() => setIsSearchOpen(true)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full">
                    <Search size={22} />
                  </button>
                  <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-full relative">
                    <Bell size={22} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                </>
              )}
              <button 
                onClick={() => setActiveTab('myPage')}
                className={`p-1.5 rounded-full transition-colors ${activeTab === 'myPage' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                <User size={20} />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 space-y-6">
            {activeTab === 'home' && (
              <HomeView 
                setActiveTab={setActiveTab} 
                likedBrands={likedBrands} 
                toggleLike={toggleLike}
                onOpenSearch={(query = '') => {
                  setSearchQuery(query);
                  setIsSearchOpen(true);
                }}
                onOpenComment={(issue) => setSelectedIssue(issue)}
              />
            )}
            {activeTab === 'myExpense' && (
              <MyExpenseView likedBrands={likedBrands} toggleLike={toggleLike} />
            )}
            {activeTab === 'stockTrend' && (
              <StockTrendView setActiveTab={setActiveTab} />
            )}
            {activeTab === 'investmentInfo' && (
              <InvestmentInfoView />
            )}
            {activeTab === 'myPage' && (
              <MyPageView likedBrands={likedBrands} setLikedBrands={setLikedBrands} />
            )}
          </main>

          {/* Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-50">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <Home size={22} />
              <span className="text-xs">홈</span>
            </button>
            <button onClick={() => setActiveTab('myExpense')} className={`flex flex-col items-center gap-1 ${activeTab === 'myExpense' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <CreditCard size={22} />
              <span className="text-xs">내 소비</span>
            </button>
            <button onClick={() => setActiveTab('stockTrend')} className={`flex flex-col items-center gap-1 ${activeTab === 'stockTrend' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <LineChart size={22} />
              <span className="text-xs">주식 트렌드</span>
            </button>
            <button onClick={() => setActiveTab('investmentInfo')} className={`flex flex-col items-center gap-1 ${activeTab === 'investmentInfo' ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
              <PieChart size={22} />
              <span className="text-xs">투자정보</span>
            </button>
          </nav>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   1. 홈 뷰 (의견 남기기 클릭 기능 포함)
   ========================================================================= */
function HomeView({ setActiveTab, likedBrands, toggleLike, onOpenSearch, onOpenComment }) {
  const issues = [
    {
      id: 1,
      tag: "베이커리 협업",
      title: "런던베이글뮤지엄 제휴 콜라보 대흥행",
      commentsCount: 128,
      likesCount: 342,
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      tag: "가성비 뷰티",
      title: "다이소 5천원 뷰티 앰플 품절 대란",
      commentsCount: 96,
      likesCount: 512,
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-pink-500 tracking-wider">LIFESTYLE TO WEALTH</span>
            <h1 className="text-2xl font-black text-slate-900 mt-0.5">
              요즘 다들 <span className="text-blue-600">뭐 사지 ?</span>
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-1">실시간 소비 레이더</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-full text-slate-700">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-20 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && onOpenSearch(e.target.value)}
          />
          <button 
            onClick={(e) => onOpenSearch(e.currentTarget.previousElementSibling.value)}
            className="absolute right-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg"
          >
            검색
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 scrollbar-none">
          <span className="text-slate-400 flex items-center gap-1 shrink-0">🕒 최근 본</span>
          {['#메가커피', '#삼양식품', '#아모레퍼시픽'].map((tag, idx) => (
            <button 
              key={idx} 
              onClick={() => onOpenSearch(tag.replace('#', ''))}
              className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full shrink-0 font-medium hover:bg-slate-50"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 실시간 급상승 소비 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-red-500">🔥</span> 실시간 급상승 소비 트렌드
          </h2>
          <span className="text-[11px] font-extrabold text-blue-600">LIVE NOW</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[240px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80" alt="디저트" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">2030 오픈런 간식 1위</span>
              <span className="absolute bottom-2 right-2 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md">↗ +420%</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900 line-clamp-1">달콤바삭 끝판왕! 빠리바게트 초코...</h3>
              <p className="text-xs text-slate-500 mt-1">SNS 숏폼 타고 전국 매장 조기 품절 행진</p>
            </div>
          </div>

          <div className="min-w-[200px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <div className="relative h-32 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" alt="올리브영" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">세일 완판</span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-slate-900">올리브영</h3>
              <p className="text-xs text-slate-500 mt-1">실리콘투 · 코스...</p>
            </div>
          </div>
        </div>
      </div>

      {/* 내가 찜한 브랜드의 트렌드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">내가 찜한 브랜드의 트렌드</h2>
            <p className="text-xs text-slate-500">소비자가 주목하는 최신 핫이슈 & 이벤트 모음</p>
          </div>
          <button onClick={() => setActiveTab('myExpense')} className="text-xs text-blue-600 font-semibold flex items-center">
            전체보기 <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-extrabold tracking-tighter">MUSINSA</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">무신사</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">빅세일</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">스프링 메가세일 최대 80% 할인</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <span className="text-pink-500">🏷️</span>
                <span className="truncate">무신사 스프링 메가세일 시작! 단독...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[11px]">
                세일 혜택 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">☕</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">스타벅스</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">프로모션</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">프리퀀시 증정품 조기 소진 주의</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <span className="text-emerald-600">🎉</span>
                <span className="truncate">봄 시즌 한정 체리블라썸 음료 & MD 오픈...</span>
              </div>
              <button className="text-blue-600 font-bold shrink-0 flex items-center text-[11px]">
                이벤트 보기 <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 신제품 & 소셜 핫이슈 (의견 남기기 클릭 가능) */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span className="text-blue-600">⚡</span> 신제품 & 소셜 핫이슈
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {issues.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-28 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover z-10 relative"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-2xl absolute z-0">✨</span>
                </div>
                <div className="p-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.tag}</span>
                  <h3 className="font-bold text-xs text-slate-900 leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-0.5"><MessageSquare size={12} /> {item.commentsCount}</span>
                    <span className="flex items-center gap-0.5 text-pink-500"><Heart size={12} /> {item.likesCount}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0">
                <button 
                  onClick={() => onOpenComment(item)}
                  className="w-full text-left text-xs font-semibold text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 hover:text-blue-600"
                >
                  의견 남기기 <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. 검색 뷰
   ========================================================================= */
function SearchView({ searchQuery, setSearchQuery, onClose, setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onClose} className="p-1 text-slate-700">
          <ChevronLeft size={24} />
        </button>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="브랜드, 핫한 간식, 뷰티 기업 검색..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
            autoFocus
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center py-8 text-slate-400 text-sm">
        "{searchQuery}"에 대한 검색 결과가 있습니다.
      </div>
    </div>
  );
}

/* =========================================================================
   3. 내 소비 뷰
   ========================================================================= */
function MyExpenseView({ likedBrands, toggleLike }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">내 소비 분석</h1>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
        <p className="text-xs text-slate-500">이번 달 나의 최애 카테고리</p>
        <p className="text-lg font-bold text-blue-600">☕ 디저트 & 카페 (45%)</p>
      </div>
    </div>
  );
}

/* =========================================================================
   4. 주식 트렌드 뷰
   ========================================================================= */
function StockTrendView() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">소비 관련 종목 트렌드</h1>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm font-bold text-slate-800">🔥 실시간 관심 수혜주</p>
        <p className="text-xs text-slate-500 mt-1">CJ제일제당, 삼양식품, F&F</p>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 투자 정보 뷰
   ========================================================================= */
function InvestmentInfoView() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">소비 데이터 인사이트</h1>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-xs text-slate-500">2030 여성 소비 증가율 1위</p>
        <p className="text-base font-bold text-pink-600 mt-1">인디 뷰티 브랜드 앰플 류 (+180%)</p>
      </div>
    </div>
  );
}

/* =========================================================================
   6. 마이 페이지 뷰
   ========================================================================= */
function MyPageView({ likedBrands }) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">
          백
        </div>
        <div>
          <h2 className="font-bold text-slate-900">백보경 님</h2>
          <p className="text-xs text-slate-400">트렌드 수집가 · Lv.2</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. 트렌드 의견 나누기 뷰 (Supabase DB 저장 연동)
   ========================================================================= */
function CommentView({ issue, onClose }) {
  const [selectedFeeling, setSelectedFeeling] = useState('기대돼요');
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');

  const [comments, setComments] = useState([
    {
      id: 1,
      user: '민트초코 님',
      level: 'Lv.2',
      time: '11분 전',
      feeling: '🔥 기대돼요',
      text: '저 여기 주말에 2시간 웨이팅해서 먹었는데 진짜 대박이에요... 주식 사야하나 고민됨',
      likes: 12
    },
    {
      id: 2,
      user: '초보자 님',
      level: 'Lv.1',
      time: '30분 전',
      feeling: '🤔 글쎄요',
      text: '요즘 콜라보가 너무 많아서 금방 식지 않을까 걱정되네요.',
      likes: 3
    }
  ]);

  const handleSubmit = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || status === 'saving') return;

    setStatus('saving');

    try {
      const fullContent = `[${selectedFeeling}] ${trimmed}`;
      const { error } = await supabase
        .from('input_db')
        .insert({ input: fullContent });

      if (error) throw error;

      const newComment = {
        id: Date.now(),
        user: '백보경 님',
        level: 'Lv.2',
        time: '방금 전',
        feeling: selectedFeeling === '기대돼요' ? '🔥 기대돼요' : selectedFeeling === '이미 샀어요' ? '🛒 이미 샀어요' : '🤔 글쎄요',
        text: trimmed,
        likes: 0
      };

      setComments([newComment, ...comments]);
      setInputText('');
      setStatus('saved');
    } catch (err) {
      console.error('의견 저장 에러:', err.message);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative animate-fadeIn pb-24">
      {/* 상단 Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold text-slate-900">트렌드 의견 나누기</h1>
        <button onClick={onClose} className="p-1 text-slate-700 hover:bg-slate-100 rounded-full">
          <X size={22} />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* 선택한 이슈 요약 카드 */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <img src={issue?.img} alt={issue?.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">#{issue?.tag}</span>
            <h2 className="font-bold text-sm text-slate-900 leading-snug">{issue?.title}</h2>
          </div>
        </div>

        {/* 기대도 투표 결과 그래프 바 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">🔥 기대돼요</span>
            <span className="text-sm font-black text-blue-600">74%</span>
          </div>
          <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-100 flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 flex items-center gap-1">🤔 글쎄요</span>
            <span className="text-sm font-black text-purple-600">26%</span>
          </div>
        </div>

        {/* 실시간 의견 피드 */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-slate-900">실시간 의견 피드</h3>

          {comments.map((c) => (
            <div key={c.id} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                    {c.user[0]}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{c.user}</span>
                    <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded ml-1.5">{c.level}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{c.time}</span>
              </div>

              <span className="inline-block text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {c.feeling}
              </span>

              <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>

              <div className="flex justify-end pt-1">
                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <Heart size={12} /> {c.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 의견 입력 바 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-3.5 space-y-2.5 z-50">
        <div className="flex gap-2">
          {[
            { id: '기대돼요', label: '🔥 기대돼요' },
            { id: '이미 샀어요', label: '🛒 이미 샀어요' },
            { id: '글쎄요', label: '🤔 글쎄요' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFeeling(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedFeeling === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="이 이슈에 대한 의견이나 소비 경험을 남겨주세요..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'saving'}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 transition-colors disabled:bg-slate-300"
          >
            {status === 'saving' ? '저장중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}