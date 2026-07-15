const TOPICS = [
  { id: "education", name: "教育与成长", short: "教育", memory: "把学校想成一座桥：知识在左岸，独立判断在右岸。" },
  { id: "technology", name: "科技与社会", short: "科技", memory: "想象手机屏幕是一扇窗：它让世界更近，也可能挡住眼前的人。" },
  { id: "environment", name: "环境与气候", short: "环境", memory: "把地球想成一个只有一个进水口、没有备用水箱的家。" },
  { id: "health", name: "健康与生活", short: "健康", memory: "把身体看作长期账户：睡眠、饮食和运动都是每天的小额存款。" },
  { id: "work", name: "工作与经济", short: "工作", memory: "想象一架天平：一边是收入，一边是时间、意义与安全感。" },
  { id: "culture", name: "文化与媒体", short: "文化", memory: "把文化想成一条河：传统是河床，新表达是不断变化的水。" },
  { id: "city", name: "城市与交通", short: "城市", memory: "俯瞰一座城市：道路像血管，住房像器官，公共空间像肺。" },
  { id: "science", name: "科学与探索", short: "科学", memory: "想象科学家拿着手电筒走进黑屋，每个答案都会照出新的问题。" },
  { id: "global", name: "全球化与公平", short: "全球", memory: "把世界想成一张网：一个地方的拉动，会让远处也产生震动。" },
  { id: "mind", name: "心理与个人选择", short: "心理", memory: "把注意力想成舞台灯光：照在哪里，哪里就成为你当下的世界。" }
];

const RAW_LESSONS = [
  ["Although exams can measure certain skills|they rarely reveal|how creatively a student can think.","虽然考试可以衡量某些技能，但它们很少能揭示学生的创造性思维能力。"],
  ["Children learn most effectively|when curiosity is encouraged|rather than controlled.","当好奇心受到鼓励而非控制时，儿童学习得最有效。"],
  ["A good teacher does more than deliver information|because genuine education|changes the way people ask questions.","好老师不只是传递信息，因为真正的教育会改变人们提问的方式。"],
  ["Students who read beyond the syllabus|often develop|a broader understanding of the world.","阅读教学大纲之外内容的学生，往往会形成更广阔的世界理解。"],
  ["If schools ignore practical skills|young people may struggle|to apply knowledge in daily life.","如果学校忽视实用技能，年轻人可能难以把知识应用到日常生活中。"],
  ["University should be viewed as an opportunity to grow|not simply as a route|to a higher salary.","大学应被视为成长的机会，而不只是通往更高薪水的道路。"],
  ["The ability to evaluate evidence|has become essential|in an age of unlimited information.","在信息无限的时代，评估证据的能力已经变得至关重要。"],
  ["When mistakes are treated as useful feedback|learners become more willing|to take intellectual risks.","当错误被当作有用的反馈时，学习者会更愿意进行思维冒险。"],
  ["Education can reduce inequality|only if quality teaching|is available to every child.","只有当每个孩子都能获得优质教学时，教育才能减少不平等。"],
  ["Lifelong learning matters|because the knowledge required at work|continues to change.","终身学习很重要，因为工作所需的知识在不断变化。"],

  ["Technology saves time in many situations|but it also creates|new demands on our attention.","科技在许多情况下节省时间，但也给我们的注意力带来新的要求。"],
  ["Social media connects distant communities|while sometimes making nearby relationships|feel less meaningful.","社交媒体连接了遥远的社群，却有时让身边的关系显得不那么有意义。"],
  ["Artificial intelligence can support human judgment|provided that its decisions|remain open to examination.","只要人工智能的决定仍可被审查，它就能辅助人类判断。"],
  ["People often accept convenience|without considering|the personal data they exchange for it.","人们常常接受便利，却没有考虑为此交换出去的个人数据。"],
  ["As remote work becomes more common|companies must learn|how to maintain trust across distance.","随着远程工作越来越普遍，公司必须学会如何跨越距离维持信任。"],
  ["Digital tools are most valuable|when they solve a real problem|rather than create a new distraction.","数字工具在解决真实问题而不是制造新干扰时最有价值。"],
  ["The rapid spread of false information|shows why technical progress|must be matched by media literacy.","虚假信息的迅速传播说明，技术进步必须与媒介素养相匹配。"],
  ["Automation may replace repetitive tasks|yet it can also allow workers|to focus on more creative decisions.","自动化可能取代重复性任务，但也能让员工专注于更有创造性的决策。"],
  ["A device designed to bring people together|can easily isolate them|if it dominates every conversation.","一台为连接人们而设计的设备，如果主导每次谈话，也很容易使人孤立。"],
  ["Society should shape technology according to shared values|instead of allowing technology|to shape society by accident.","社会应依据共同价值塑造科技，而不是任由科技在无意中塑造社会。"],

  ["Climate change is not a distant possibility|but a present reality|that influences food, health, and migration.","气候变化不是遥远的可能，而是正在影响食物、健康和迁徙的现实。"],
  ["Individual choices matter|although lasting environmental progress|also requires effective public policy.","个人选择很重要，但持久的环境进步也需要有效的公共政策。"],
  ["Cities can reduce pollution|by making public transport|reliable, affordable, and convenient.","城市可以通过让公共交通可靠、可负担且便利来减少污染。"],
  ["When forests disappear|communities lose not only wildlife|but also protection from floods and heat.","森林消失时，社区失去的不只是野生动物，还有抵御洪水和高温的保护。"],
  ["Recycling is useful|but reducing unnecessary consumption|has an even greater impact.","回收利用很有用，但减少不必要的消费影响更大。"],
  ["Clean energy becomes more attractive|as its cost falls|and its reliability improves.","随着成本下降和可靠性提高，清洁能源变得更具吸引力。"],
  ["Environmental damage often appears cheap in the short term|because its true cost|is passed to future generations.","环境破坏短期看来代价很低，因为真正的成本被转嫁给了后代。"],
  ["Protecting the ocean requires cooperation|since plastic and pollution|do not respect national borders.","保护海洋需要合作，因为塑料和污染不受国界限制。"],
  ["People are more likely to change their habits|when greener choices|are also the easier choices.","当更环保的选择同时也是更容易的选择时，人们更可能改变习惯。"],
  ["A sustainable economy must meet present needs|without destroying|the resources on which tomorrow depends.","可持续经济必须满足当前需求，同时不破坏未来赖以生存的资源。"],

  ["Regular exercise improves mental health|as well as|physical strength.","规律运动既能改善心理健康，也能增强体力。"],
  ["Many people sacrifice sleep to gain more time|only to become|less productive the next day.","许多人牺牲睡眠来争取时间，结果第二天效率反而更低。"],
  ["Public health improves when prevention is affordable|and reliable advice|is easy to understand.","当预防措施可负担、可靠建议易理解时，公共健康就会改善。"],
  ["A balanced diet is not defined by one perfect meal|but by choices|repeated over many months.","均衡饮食不是由一顿完美的饭决定，而是由数月重复的选择决定。"],
  ["Loneliness can affect the body|even when its symptoms|are difficult to see.","孤独会影响身体，即使它的症状难以看见。"],
  ["People are more likely to seek help|when mental illness|is discussed without shame.","当心理疾病能被不带羞耻地讨论时，人们更可能寻求帮助。"],
  ["Modern medicine extends life|but quality of life|should remain an equally important goal.","现代医学延长寿命，但生活质量应仍是同样重要的目标。"],
  ["Small healthy habits are easier to maintain|than dramatic changes|that depend on constant motivation.","小而健康的习惯比依赖持续动力的巨大改变更容易维持。"],
  ["Healthcare systems work best|when patients are treated as partners|rather than passive recipients.","当患者被视为合作伙伴而不是被动接受者时，医疗系统运行得最好。"],
  ["The design of a neighbourhood|can influence how often residents|walk, rest, and meet one another.","社区的设计会影响居民散步、休息和彼此见面的频率。"],

  ["A high salary can provide security|but it does not automatically create|a satisfying career.","高薪可以带来安全感，但不会自动造就令人满意的职业。"],
  ["Employees tend to perform better|when they understand|why their work matters.","当员工理解自己的工作为何重要时，他们通常表现得更好。"],
  ["Economic growth is valuable|only when its benefits|are shared across society.","只有当经济增长的利益在社会中得到共享时，它才真正有价值。"],
  ["Flexible working hours can increase productivity|by allowing people|to work when they focus best.","灵活工作时间可以让人们在最专注时工作，从而提高生产力。"],
  ["Unpaid care supports the entire economy|although it is often|missing from official statistics.","无偿照护支撑着整个经济，尽管它常常不出现在官方统计中。"],
  ["A strong business earns public trust|through consistent behaviour|rather than clever advertising.","强大的企业通过一贯的行为而非聪明的广告赢得公众信任。"],
  ["Workers need opportunities to retrain|as industries adapt|to technological and environmental change.","随着行业适应技术和环境变化，劳动者需要再培训机会。"],
  ["Short-term profit can become expensive|if a company ignores|its employees, customers, or reputation.","如果公司忽视员工、客户或声誉，短期利润可能变得代价高昂。"],
  ["Entrepreneurs often succeed by noticing|a small problem|that larger organisations have overlooked.","创业者常常因为注意到大型组织忽略的小问题而成功。"],
  ["Financial security depends less on appearing wealthy|than on managing resources|with patience and discipline.","财务安全与其说取决于看起来富有，不如说取决于耐心而自律地管理资源。"],

  ["Traditions remain alive|when each generation finds|a meaningful way to reinterpret them.","当每一代人都找到有意义的方式重新诠释传统时，传统才会保持生命力。"],
  ["News does more than report events|because the stories it selects|shape public attention.","新闻不只是报道事件，因为它选择的故事会塑造公众注意力。"],
  ["Museums become more relevant|when visitors can connect the past|with questions they face today.","当参观者能把过去与当下问题联系起来时，博物馆会更有现实意义。"],
  ["A language carries memories and values|that cannot always be translated|without some loss.","一种语言承载着记忆和价值，而翻译时总可能有所损失。"],
  ["Popular entertainment can reveal|what a society fears, admires,|or hopes to become.","流行娱乐可以揭示一个社会害怕什么、崇尚什么，或希望成为什么。"],
  ["Freedom of expression is strongest|when people also accept responsibility|for the effects of their words.","当人们也愿意为言语的影响负责时，表达自由才最有力量。"],
  ["Seeing life through another person's story|can challenge prejudice|more deeply than a list of facts.","透过他人的故事看生活，比一串事实更能深入挑战偏见。"],
  ["Cultural exchange creates understanding|provided that curiosity|is accompanied by respect.","只要好奇心伴随着尊重，文化交流就能创造理解。"],
  ["Advertising is most persuasive|when it connects a product|with an identity people desire.","广告在把产品与人们渴望的身份联系起来时最具说服力。"],
  ["The survival of local culture depends on daily practice|not merely on festivals|held once a year.","地方文化的存续依靠日常实践，而不只是每年举办一次的节庆。"],

  ["A liveable city allows people to reach daily needs|without spending hours|in traffic.","宜居城市让人们无需在交通中耗费数小时就能满足日常需求。"],
  ["Building more roads may reduce congestion briefly|but it often encourages|even more people to drive.","修建更多道路或许会短暂缓解拥堵，但往往会鼓励更多人开车。"],
  ["Affordable housing keeps communities stable|by enabling essential workers|to live near their jobs.","可负担住房让必要岗位的员工能住在工作附近，从而保持社区稳定。"],
  ["Public spaces are valuable|because they allow strangers|to share the city peacefully.","公共空间很有价值，因为它让陌生人能够和平共享城市。"],
  ["Cycling becomes a realistic option|when safe routes form|a connected network.","当安全路线形成连贯网络时，骑行才会成为现实选择。"],
  ["Historic buildings give a city character|yet they must often be adapted|to serve modern needs.","历史建筑赋予城市个性，但通常也必须调整以服务现代需求。"],
  ["Reliable transport expands opportunity|especially for people|who cannot afford a car.","可靠的交通扩大了机会，尤其对买不起汽车的人而言。"],
  ["Urban trees provide shade, cleaner air, and calm|while using far less space|than many engineered solutions.","城市树木提供阴凉、清洁空气与宁静，而占用空间远少于许多工程方案。"],
  ["A neighbourhood feels safe|when streets are active|and residents know one another.","当街道有活力、居民彼此相识时，社区会让人感到安全。"],
  ["Good planning considers how a place feels on foot|not only how it appears|on a map.","好的规划会考虑一个地方步行时的感受，而不只是在地图上的样子。"],

  ["Scientific knowledge advances|when researchers are willing|to question accepted explanations.","当研究人员愿意质疑公认的解释时，科学知识就会进步。"],
  ["A single experiment rarely proves everything|but it can reveal|which question should be asked next.","一次实验很少能证明一切，但它可以揭示接下来该问什么。"],
  ["Public confidence in science depends on honesty|about both what is known|and what remains uncertain.","公众对科学的信心取决于对已知和未知都保持诚实。"],
  ["Space exploration seems remote from daily life|yet many ordinary technologies|grew from research beyond Earth.","太空探索似乎远离日常生活，但许多普通技术源于地球之外的研究。"],
  ["Innovation often begins with basic research|whose practical value|is not immediately obvious.","创新往往始于基础研究，而其实用价值并不会立刻显现。"],
  ["Data can guide a decision|but it cannot decide|which human values matter most.","数据可以指导决策，但不能决定哪些人类价值最重要。"],
  ["Medical research must protect participants|even when a discovery|could benefit millions.","即使一项发现可能使数百万人受益，医学研究也必须保护参与者。"],
  ["The best explanation is not always the most complex|but the one that accounts for evidence|with the fewest assumptions.","最好的解释不一定最复杂，而是以最少假设解释证据的那个。"],
  ["Failure is informative in science|when methods and results|are reported clearly.","当方法和结果被清楚报告时，失败在科学中也能提供信息。"],
  ["Human curiosity drives exploration|even when the final destination|cannot yet be imagined.","即使最终目的地还无法想象，人类的好奇心也会推动探索。"],

  ["Global trade can lower prices|while also making local economies|more vulnerable to distant events.","全球贸易可以降低价格，同时也会让地方经济更易受遥远事件影响。"],
  ["Migration brings skills and energy|but successful integration|requires effort from both newcomers and residents.","移民带来技能与活力，但成功融入需要新来者和本地居民共同努力。"],
  ["A crisis in one country can spread quickly|because modern systems|are closely connected.","一个国家的危机可能迅速扩散，因为现代系统紧密相连。"],
  ["International aid works best|when local communities help decide|how resources are used.","当当地社区参与决定资源如何使用时，国际援助效果最好。"],
  ["Equal opportunity does not mean identical support|because people begin life|from very different positions.","机会平等并不意味着完全相同的支持，因为人们的人生起点非常不同。"],
  ["Wealthy nations have greater power to address global problems|and therefore carry|greater responsibility.","富裕国家更有能力应对全球问题，因此也承担更大责任。"],
  ["Tourism can support local livelihoods|if income remains in the community|and nature is protected.","如果收入留在社区且自然得到保护，旅游业就能支持当地生计。"],
  ["Fair rules matter most|when they protect those|with the least influence.","公平规则最重要的作用，是保护影响力最小的人。"],
  ["Cooperation between countries is difficult|but many modern threats|are impossible to solve alone.","国家间合作很困难，但许多现代威胁不可能靠单独行动解决。"],
  ["Understanding another society begins|with the humility to listen|before offering solutions.","理解另一个社会，始于在提出解决方案前谦逊地倾听。"],

  ["People often overestimate what they can change in a day|and underestimate|what steady effort can achieve in a year.","人们常高估一天能改变的事，却低估持续努力一年能取得的成果。"],
  ["Confidence grows from keeping small promises to yourself|rather than waiting|to feel completely fearless.","自信来自履行对自己的小承诺，而不是等待自己完全不再害怕。"],
  ["A difficult choice becomes clearer|when we separate|what is urgent from what is important.","当我们把紧急与重要分开时，艰难的选择会变得更清晰。"],
  ["Happiness is influenced by circumstance|but attention determines|which parts of life we notice.","幸福受环境影响，但注意力决定我们会看见生活的哪些部分。"],
  ["Comparison can provide useful information|until it becomes|the only measure of personal worth.","比较可以提供有用信息，直到它变成衡量个人价值的唯一标准。"],
  ["People make better decisions|when strong emotions are acknowledged|rather than denied.","当强烈情绪被承认而不是否认时，人们会做出更好的决定。"],
  ["A meaningful goal gives direction|while flexible plans allow us|to respond to reality.","有意义的目标提供方向，而灵活的计划让我们能回应现实。"],
  ["Rest is not the opposite of progress|because recovery makes|sustained effort possible.","休息并非进步的反面，因为恢复让持续努力成为可能。"],
  ["We remember experiences more clearly|when they are connected|to emotion, place, or story.","当经历与情绪、地点或故事相连时，我们记得更清楚。"],
  ["Personal freedom becomes meaningful|when choices are guided|by awareness of their consequences.","当选择受到后果意识的引导时，个人自由才有意义。"]
];

const WORD_NOTES = {
  reveal:["揭示","reveal a pattern","把盖子掀开，里面的事实露出来"], curiosity:["好奇心","encourage curiosity","curious + -ity = 好奇的状态"], evidence:["证据","evaluate evidence","法庭桌上摆着证据"], inequality:["不平等","reduce inequality","equal 前加否定前缀 in-"], essential:["必不可少的","essential skill","没有它就无法继续"],
  attention:["注意力","demand attention","聚光灯照到哪里，注意力就在哪里"], examination:["审查；检查","open to examination","exam 的同族词"], convenience:["便利","value convenience","convenient 变名词"], automation:["自动化","automation replaces tasks","auto 表示自己运转"], literacy:["素养；读写能力","media literacy","不只会读，还会判断"],
  climate:["气候","climate change","长期天气模式"], sustainable:["可持续的","sustainable economy","能一直支撑下去"], consumption:["消费","reduce consumption","consume 的名词形式"], pollution:["污染","reduce pollution","pollute 的名词形式"], generation:["一代人","future generations","想象家族时间线"],
  prevention:["预防","prevention is affordable","prevent + -ion"], productive:["高效的","become productive","能产出结果"], symptoms:["症状","show symptoms","身体发出的信号"], maintain:["维持","maintain a habit","一直用手托住不让它掉"], healthcare:["医疗保健","healthcare system","health + care"],
  security:["安全；保障","financial security","像一张安全网"], productivity:["生产力","increase productivity","productive 的名词形式"], economy:["经济","support the economy","社会资源流动的大系统"], reputation:["声誉","protect a reputation","别人心中的长期评分"], discipline:["自律；纪律","patience and discipline","每天按计划做一点"],
  traditions:["传统","keep traditions alive","一代传给下一代"], expression:["表达","freedom of expression","express 的名词形式"], prejudice:["偏见","challenge prejudice","还没看清就先下判断"], persuasive:["有说服力的","persuasive advertising","persuade 的形容词"], reinterpret:["重新诠释","reinterpret tradition","re- 表示再次"],
  congestion:["拥堵","reduce congestion","道路像被塞住的管道"], affordable:["负担得起的","affordable housing","afford + able"], reliable:["可靠的","reliable transport","每次都按约出现"], neighbourhood:["社区；街区","a safe neighbourhood","住在附近的人形成的区域"], residents:["居民","local residents","reside 居住 + -ent 人"],
  researchers:["研究人员","researchers question","research + -er"], experiment:["实验","conduct an experiment","用测试检验想法"], uncertain:["不确定的","remain uncertain","certain 前加 un-"], innovation:["创新","drive innovation","innovate 的名词形式"], assumptions:["假设","few assumptions","结论下面看不见的支架"],
  vulnerable:["脆弱的；易受影响的","vulnerable to change","没有盔甲保护"], migration:["迁徙；移民","international migration","migrate 的名词形式"], integration:["融合","successful integration","不同部分进入同一个整体"], opportunity:["机会","equal opportunity","一扇可以推开的门"], responsibility:["责任","carry responsibility","肩上背着必须完成的事"],
  overestimate:["高估","overestimate ability","over- 表示超过"], underestimate:["低估","underestimate progress","under- 表示不足"], confidence:["自信","build confidence","一次次兑现承诺形成"], circumstance:["环境；境况","personal circumstance","围绕一个人的外部条件"], consequences:["后果","consider consequences","选择之后跟着来的结果"]
};

const TOPIC_FOCUS = [
  ["让步关系 although","主句重音落在 measure / reveal","不要逐词翻译，先抓考试和能力的对比"],
  ["转折关系 but / while","功能词弱读","抓住便利与代价的双面结构"],
  ["原因与条件","辅音接元音","用问题—行动—长期结果来复述"],
  ["比较与因果","as well as 连成一组","把健康行为和身体结果连成画面"],
  ["条件与结果","than / to 常弱读","用天平记住收益与代价"],
  ["时间与条件从句","and / of 弱读","用传统、故事或媒体的具体画面记忆"],
  ["when 引导条件","连读与失爆","用城市地图还原交通—空间—生活"],
  ["论点与限定","that / can 弱读","按问题—证据—解释组织句子"],
  ["让步与条件","介词弱读","用网络节点记住相互依赖"],
  ["时间与对比","辅音接元音","把抽象心理概念变成可见动作"]
];

window.LESSONS = RAW_LESSONS.map((row, index) => {
  const topicIndex = Math.floor(index / 10);
  const chunks = row[0].split("|");
  const sentence = chunks.join(" ");
  return {
    id: index + 1,
    topic: TOPICS[topicIndex],
    sentence,
    translation: row[1],
    chunks,
    focus: TOPIC_FOCUS[topicIndex],
    memory: TOPICS[topicIndex].memory,
    skeleton: chunks.map((chunk, i) => i === 0 ? chunk : `→ ${chunk}`).join(" ")
  };
});
window.TOPICS = TOPICS;
window.WORD_NOTES = WORD_NOTES;

Object.assign(window.LESSONS[0], {
  topic: { id: "science", name: "原书 · 探索宇宙", short: "科学" },
  sentence: "There is considerable debate over how we should react if we detect a signal from an alien civilisation.",
  translation: "如果我们探测到了来自外星文明的信号，我们应该如何回应是一个备受争议的问题。",
  chunks: [
    "There is considerable debate",
    "over how we should react",
    "if we detect a signal",
    "from an alien civilisation"
  ],
  skeleton: "There is considerable debate → over how we should react → if we detect a signal → from an alien civilisation",
  memory: "想象地球收到一个来自外星文明的信号，各国代表围坐争论：我们应该如何回应？用“存在争议—如何回应—如果探测到—外星信号”四步还原。",
  focus: ["there be句型", "宾语从句 + 条件状语从句", "围绕争议、太空探索与搜寻扩展词群"],
  bookGrammar: [
    { title: "句子主干", text: "There is considerable debate...，使用 there be 句型表示“存在相当大的争议”。" },
    { title: "宾语从句", text: "how we should react... 是 how 引导的宾语从句，整体作介词 over 的宾语。" },
    { title: "条件状语从句", text: "if we detect a signal... 由 if 引导，说明“如果探测到信号”这一条件。" },
    { title: "后置修饰", text: "from an alien civilisation 修饰 signal，说明信号的来源。" }
  ],
  bookGroups: [
    {
      title: "核心词表",
      words: [
        ["considerable /kənˈsɪdərəbl/", "adj. 相当大（或多）的；可观的；值得考虑的；重要的", "词根：consider（考虑）+ -able（能……的）。近义：great, large, much, substantial。"],
        ["react /riˈækt/", "v. 反应；反抗；起化学反应", "搭配：react positively to a suggestion 赞成一项提议；近义：respond。"],
        ["detect /dɪˈtekt/", "v. 察觉；侦查；探测", "同根：undetected 未被发现的；detectable 可发现的、可察觉的。"],
        ["signal /ˈsɪɡnəl/", "n. 信号；暗号；标志；v. 发信号；标志着", "联想：sign（签名）+ -al，用签名作为自己的标志。"],
        ["alien /ˈeɪliən/", "n. 外星人；adj. 外国的；相异的", "搭配：alien species 外来物种。"],
        ["civilisation /ˌsɪvəlaɪˈzeɪʃn/", "n. 文明（社会）；文化", "词根：civilise（使文明开化）+ -ation（名词后缀）。"]
      ]
    },
    {
      title: "主题归纳：争论与争辩",
      words: [
        ["bicker /ˈbɪkə(r)/", "vi. 为琐事争吵", "搭配：bicker over 为……争吵。"],
        ["brawl /brɔːl/", "n./vi. 在公共场合争吵、打斗", "—"],
        ["contention /kənˈtenʃn/", "n. 争辩", "搭配：in contention 在争辩中。"],
        ["contentious /kənˈtenʃəs/", "adj. 爱争论的；有异议的", "—"],
        ["controversial /ˌkɒntrəˈvɜːʃl/", "adj. 有争议的", "词根：contro（相反）+ vers（转）+ -ial。"],
        ["controversy /ˈkɒntrəvɜːsi/", "n. 争论；辩论", "搭配：beyond controversy 无可争论的。"],
        ["controvert /ˈkɒntrəvɜːt/", "v. 驳斥；反驳", "词根：contro（相反）+ vert（转）。"],
        ["counter /ˈkaʊntə(r)/", "v. 反驳；反对；对抗；抵消", "—"],
        ["debatable /dɪˈbeɪtəbl/", "adj. 可争辩的；有争议的", "搭配：a debatable point 有争议的地方。"],
        ["deny /dɪˈnaɪ/", "v. 驳斥；反对", "—"],
        ["disagreement /ˌdɪsəˈɡriːmənt/", "n. 争论", "—"],
        ["disprove /ˌdɪsˈpruːv/", "v. 反驳；证明……有误", "词根：dis-（不）+ prove（证明）。"],
        ["dispute /dɪˈspjuːt/", "v. 争端；纠纷；n. 论辩", "搭配：in dispute 在争议中。"],
        ["dissentious /dɪˈsenʃəs/", "adj. 争论的", "—"],
        ["eloquence /ˈeləkwəns/", "n. 雄辩；口才", "搭配：eloquence training 口才训练。"],
        ["eloquent /ˈeləkwənt/", "adj. 雄辩的", "搭配：eloquent speech 雄辩的演讲。"],
        ["gainsay /ˌɡeɪnˈseɪ/", "v. 否认；反驳", "—"],
        ["quarrel /ˈkwɒrəl/", "v. 争论", "近义：argue。"],
        ["rebut /rɪˈbʌt/", "vt. 驳斥；反驳", "—"],
        ["refute /rɪˈfjuːt/", "v. 反驳；否认", "—"],
        ["rejoinder /rɪˈdʒɔɪndə(r)/", "n. 粗鲁的回答", "词根：re-（重新）+ join（连接）+ -der。"],
        ["retort /rɪˈtɔːt/", "n./v. 反驳", "—"],
        ["squabble /ˈskwɒbl/", "v. 争吵；口角", "搭配：squabble with 与……争吵。"],
        ["tiff /tɪf/", "n. 朋友或情侣之间的争吵", "搭配：tiff with sb. 与某人争吵。"],
        ["wrangle /ˈræŋɡl/", "vi. 长时间争论；n. 持久而复杂的争辩", "—"]
      ]
    },
    {
      title: "主题归纳：探索太空",
      words: [
        ["dweller /ˈdwelə(r)/", "n. 居住者；居民", "—"],
        ["evolution /ˌiːvəˈluːʃn/", "n. 进化；演化；发展", "搭配：the evolution of man 人类的进化过程。"],
        ["extract /ɪkˈstrækt/", "v. 取出；提取；/ˈekstrækt/ n. 摘录；提取物", "搭配：extract from 从……中提取；近义：remove, cull, abstract。"],
        ["habitable /ˈhæbɪtəbl/", "adj. 可居住的", "搭配：habitable space 居住空间。"],
        ["humidity /hjuːˈmɪdəti/", "n. 湿度；潮湿", "搭配：relative humidity 相对湿度。"],
        ["inhospitable /ˌɪnhɒˈspɪtəbl/", "adj. 不适合居住的", "搭配：inhospitable climate 不适合居住的气候。"],
        ["inorganic /ˌɪnɔːˈɡænɪk/", "adj. 无机的", "—"],
        ["lander /ˈlændə(r)/", "n. 登陆者；着陆器", "—"],
        ["manned space flight", "载人航天飞行", "—"],
        ["microbial /maɪˈkrəʊbiəl/", "adj. 微生物的", "搭配：microbial degradation 微生物降解。"],
        ["orbiter /ˈɔːbɪtə(r)/", "n. 轨道飞行器", "—"],
        ["organic /ɔːˈɡænɪk/", "adj. 器官的；有机的；有机体的", "搭配：organic being 有机体；organic food 有机食品。"],
        ["planetary /ˈplænətri/", "adj. 行星的", "搭配：planetary system 行星系。"],
        ["primitive microbe", "原始微生物", "—"],
        ["reside in", "居住", "—"],
        ["solar /ˈsəʊlə(r)/", "adj. 太阳的；太阳能的", "词根：sol（太阳）+ -ar；搭配：solar energy。"],
        ["space probe", "太空探测器", "—"],
        ["spacecraft /ˈspeɪskrɑːft/", "n. 航天器；宇宙飞船", "合成词：space（太空）+ craft（技术）。"],
        ["ultraviolet radiation", "紫外线", "—"],
        ["ultraviolet /ˌʌltrəˈvaɪələt/", "adj. 紫外线的", "词根：ultra（超出）+ violet（紫罗兰色）。"],
        ["underground water", "地下水", "—"]
      ]
    },
    {
      title: "主题归纳：探索与冒险",
      words: [
        ["explore /ɪkˈsplɔː(r)/", "v. 探险；探索；仔细查阅；探究", "—"],
        ["ferret /ˈferɪt/", "vi. 搜索；翻找", "—"],
        ["grope /ɡrəʊp/", "v. 暗中摸索", "—"],
        ["risk /rɪsk/", "v. 冒……的危险；n. 冒险；风险", "搭配：run/take the risk of...；at the risk of...。"],
        ["seek /siːk/", "v. 寻找；探索；追求", "—"],
        ["venture /ˈventʃə(r)/", "n. 风险投资；风险项目；v. 冒险；敢于", "搭配：venture into the unknown 闯入未知领域。"]
      ]
    }
  ]
});
