/* FIFA 2026 Predictor — UK / EN / PL */
(function () {
  const I18N = {
    uk: {
      page_title: 'FIFA World Cup 2026 — Прогноз сітки',
      sub_brand: 'Прогноз сітки · <strong>48 команд</strong> · 104 матчі · США · Мексика · Канада',
      tab_groups: 'Групи', tab_knockout: 'Плей-оф', tab_summary: 'Підсумок', tab_leaderboard: 'Лідери', tab_howto: 'Як грати',
      score_label: 'Твій рахунок', points_word: 'очок',
      pts_legend: '3 = точний · 2 = різниця · 1 = результат · 0 = промах',
      breakdown_empty: 'Закрий тур — отримаєш PDF-купон і почнеш рахувати очки',
      breakdown_total: 'всього',
      breakdown_was: 'було {n} при закритті',
      points_short: 'оч.',
      sync_loading: 'Оновлення результатів...',
      sync_ok: 'Результати з ESPN · оновлено {time} · змінено {n} матч(ів)',
      sync_fail: 'Не вдалося оновити (потрібен інтернет). Результати з останнього завантаження.',
      sync_no_new: 'Нових результатів немає — все вже актуально.',
      btn_refresh: '🔄 Оновити результати',
      tvp_link: '📺 TVP — футбол na żywo',
      coupon_summary: '🎫 Купон — завантажити / продовжити гру',
      coupon_help: 'Прогноз закривається <strong>за 10 хв</strong> до старту (Варшава). На закритому матчі — <strong>клік</strong>, щоб побачити ставки (купони друзів — у «Лідери»). Перед новим туром — <strong>PDF-купон</strong> або «З коду внизу ↑».',
      upload_pdf: '📎 Завантажити PDF-купон',
      load_coupon: 'Завантажити купон', from_code: 'З коду внизу ↑',
      copy_code: 'Копіювати код купона', print_coupon: '📄 Друк накопичувального купона',
      btn_coupon: '📄 Купон', title_coupon: 'Букмекерський купон для друку / збереження PDF',
      placeholder_player: 'Твоє ім\'я...', placeholder_player_locked: 'Гравець',
      placeholder_ticket_in: 'Код з PDF (внизу купона) — FIFA26C|...',
      placeholder_ticket_out: 'Код накопичувального купона з\'явиться після закриття туру...',
      progress: 'Прогрес: {filled} / 104 · {status}',
      progress_active: 'активний: {round}',
      progress_done: 'усі тури закриті',
      champ_label: 'Чемпіон світу 2026',
      lb_summary: '📥 Імпорт купонів — таблиця лідерів',
      lb_help: 'Завантаж <strong>PDF</strong> або встав текст з купона. <strong>Натисни імʼя гравця</strong> — побачиш усі його прогнози по турах.',
      lb_pdf: '📎 PDF купони друзів',
      placeholder_lb: 'Встав сюди текст з PDF або купона (може бути на кількох рядках)...',
      lb_refresh: 'Оновити таблицю', lb_clear: 'Очистити',
      lb_empty: 'Додай купони друзів — з\'явиться таблиця.',
      lb_col_player: 'Гравець', lb_col_rounds: 'Тури', lb_col_total: 'Всь.',
      lb_col_pred: 'Прогн.', lb_col_res: 'Рез.', lb_col_pts: 'Оч.', lb_col_time: 'Час', lb_col_match: 'Матч',
      seal_btn: '🔒 Закрити тур і зберегти PDF-купон',
      seal_active: 'Активний тур: <strong>{round}</strong>',
      seal_missing: ' · залишилось заповнити: {n}',
      seal_ready: ' · готово до закриття!',
      seal_locked: '🔒 {round} закрито · <strong style="color:var(--gold)">{pts} очок</strong> за зіграні матчі цього туру',
      seal_group_done: 'Груповий етап завершено',
      seal_ko_pick: 'Плей-оф: обери тур вище',
      seal_round_closed: '🔒 {round} закрито',
      third_need_groups: 'Заповніть прогнози групового етапу, щоб сформувати сітку 1/16 фіналу.',
      third_sealed: 'Груповий етап закрито. Таблиці оновлюються за твоїми прогнозами.',
      third_progress: 'Спочатку закрий усі 3 тури групи ({n}/3). Потім відкриється плей-оф.',
      third_best: '8 найкращих третіх місць:',
      group_label: 'Група', tag_pred: 'прогноз', tag_pred_lock: 'прогноз 🔒', tag_result: 'результат',
      tag_locked_time: ' · ⏱ закрито (−10 хв)', tag_click_bets: ' · натисни — хто що ставив',
      tz_warsaw: 'Варшава', ko_waiting: 'Очікується...', ko_penalty: 'Хто проходить далі?',
      match_bets_title: 'Хто що поставив на цей матч',
      match_bets_empty: 'Поки ніхто не зафіксував прогноз на цей матч.<br>Додай купони друзів у вкладці «Лідери».',
      match_bets_head: 'Ставки на матч', self_name: 'Я',
      import_loaded: '✓ Купон завантажено · {rounds} тур(и) · {total} очок',
      coupon_closed: 'Закрито: {list}', coupon_next: ' · Наступний: <strong>{round}</strong>',
      coupon_hint_seal: 'Закрий перший тур — отримаєш PDF-купон',
      coupon_pdf_n: '📄 PDF ({n} тур.)',
      round_G1: '1-й тур групи', round_G2: '2-й тур групи', round_G3: '3-й тур групи',
      round_KO1: '1/16 фіналу', round_KO2: '1/8 фіналу', round_KO3: '1/4 фіналу', round_KO4: 'Півфінали', round_KO5: 'Фінал і 3-є місце',
      sync_initial: 'Результати: завантаження...', alert_sync_error: 'Помилка оновлення: {msg}\nПеревір інтернет-з\'єднання.',
      alert_fill_missing: 'Заповни ще {n} матч(ів) у цьому турі!', alert_groups_first: 'Спочатку закрий усі 3 тури групового етапу!',
      alert_seal_ok: 'Тур «{round}» закрито!\nОчок за цей тур: {pts}\nВсього очок: {total}\n\nЗбережи накопичувальний PDF-купон — він містить усі попередні тури + цей.{next}',
      alert_seal_next: '\n\nПеред «{round}» завантаж цей PDF знову.', prompt_name: 'Як тебе звати?\n\nІм\'я з\'явиться на купоні та в таблиці лідерів.',
      alert_no_name: 'Без імені не можна закрити тур і згенерувати купон.', alert_enter_name: 'Введи ім\'я у полі зверху або завантаж попередній купон.',
      alert_no_ticket: 'Спочатку закрий тур — з\'явиться код купона внизу.', alert_load_coupon: 'Завантаж PDF або встав код з купона!',
      confirm_replace: 'У тебе вже є прогрес пізніших турів. Замінити даними з купона?',
      alert_coupon_ok: 'Купон завантажено!\n{lines}\n\nВсього: {total} очок{next}',
      alert_coupon_next: '\n\n→ Заповни прогнози: «{round}»', alert_coupon_done: '\n\n→ Усі тури закриті!',
      alert_coupon_fail: 'Не вдалося прочитати купон.\n{msg}', confirm_clear_lb: 'Очистити таблицю лідерів?',
      alert_lb_added: 'Додано {n} купон(ів) до таблиці лідерів.', alert_lb_no_codes: 'Не вдалося знайти нові коди в PDF.',
      alert_copy_first: 'Спочатку закрий хоча б один тур!', alert_copied: 'Код купона скопійовано!',
      alert_copy_fail: 'Не вдалося скопіювати автоматично — виділи текст і Ctrl+C', alert_saved: 'Збережено!',
      confirm_reset: 'Скинути ВСЕ (прогнози, квитки, очки)?',
      alert_pdf_first: 'Спочатку закрий тур кнопкою «🔒 Закрити тур» — тоді зʼявиться букмекерський купон для друку.\n\nНа телефоні натисни «Друк / Зберегти PDF» у вікні купона.',
      name_locked_title: 'Ім\'я зафіксовано в купоні. «Скинувати все» — щоб змінити.', btn_close: '✕ Закрити',
      lb_preds: 'Прогнози', lb_no_preds: 'Немає зафіксованих прогнозів у купоні.', lb_round_pts: '{round} — {pts} оч.',
      lb_third_short: '8×3-є місце:', lb_read_fail: 'Не прочитано: {n} код(ів)', lb_detail_title: '{name} — {total} очок',
      lb_status_added: 'Додано {n} купон(ів) · всього {total}', import_status: '✓ Завантажено {n} тур(и) · {total} очок · {hint}',
      import_fill: 'заповни «{round}»', import_all_done: 'усі тури закриті', standings_team: 'Команда',
      standings_played: 'І', standings_pts: 'О', standings_gf: 'З', standings_ga: 'П', standings_gd: '±',
      ko_penalty_pick: 'Проходить (нічия):', pred_word: 'прогноз', match_word: 'Матч',
      summary_title: '📋 Прогноз: {name}', summary_date: 'Дата: {date}', summary_groups: '🏁 Групи (топ-2)',
      summary_thirds: '🥉 Проходять 3-і місця', summary_champ: '🏆 Чемпіон', summary_third_place: '🥉 3-є місце:',
      summary_pts: '⭐ Очки', summary_total: 'Всього: {total}', howto_title: '📖 Як грати'
    },
    en: {
      page_title: 'FIFA World Cup 2026 — Bracket Predictor',
      sub_brand: 'Bracket predictor · <strong>48 teams</strong> · 104 matches · USA · Mexico · Canada',
      tab_groups: 'Groups', tab_knockout: 'Knockout', tab_summary: 'Summary', tab_leaderboard: 'Leaders', tab_howto: 'How to play',
      score_label: 'Your score', points_word: 'pts',
      pts_legend: '3 = exact · 2 = goal diff · 1 = outcome · 0 = miss',
      breakdown_empty: 'Seal a round to lock picks and start scoring',
      breakdown_total: 'total',
      breakdown_was: 'was {n} at seal',
      points_short: 'pts',
      sync_loading: 'Updating results...',
      sync_ok: 'ESPN results · updated {time} · {n} match(es) changed',
      sync_fail: 'Update failed (internet required). Showing last loaded results.',
      sync_no_new: 'No new results — already up to date.',
      btn_refresh: '🔄 Refresh results',
      tvp_link: '📺 TVP — live football',
      coupon_summary: '🎫 Coupon — load / continue game',
      coupon_help: 'Picks lock <strong>10 min</strong> before kickoff (Warsaw). On a closed match — <strong>click</strong> to see bets (friends\' coupons in <strong>Leaders</strong>). Before the next round — <strong>PDF coupon</strong> or «From code below ↑».',
      upload_pdf: '📎 Upload PDF coupon',
      load_coupon: 'Load coupon', from_code: 'From code below ↑',
      copy_code: 'Copy coupon code', print_coupon: '📄 Print cumulative coupon',
      btn_coupon: '📄 Coupon', title_coupon: 'Bookmaker coupon for print / save as PDF',
      placeholder_player: 'Your name...', placeholder_player_locked: 'Player',
      placeholder_ticket_in: 'Code from PDF (bottom) — FIFA26C|...',
      placeholder_ticket_out: 'Cumulative coupon code appears after sealing a round...',
      progress: 'Progress: {filled} / 104 · {status}',
      progress_active: 'active: {round}',
      progress_done: 'all rounds sealed',
      champ_label: 'World Champion 2026',
      lb_summary: '📥 Import coupons — leaderboard',
      lb_help: 'Upload <strong>PDF</strong> or paste coupon text. <strong>Click a name</strong> to see all picks by round.',
      lb_pdf: '📎 Friends\' PDF coupons',
      placeholder_lb: 'Paste PDF or coupon text here (multiple lines OK)...',
      lb_refresh: 'Update table', lb_clear: 'Clear',
      lb_empty: 'Add friends\' coupons to show the table.',
      lb_col_player: 'Player', lb_col_rounds: 'Rounds', lb_col_total: 'Tot.',
      lb_col_pred: 'Pick', lb_col_res: 'Res.', lb_col_pts: 'Pts', lb_col_time: 'Time', lb_col_match: 'Match',
      seal_btn: '🔒 Seal round & save PDF coupon',
      seal_active: 'Active round: <strong>{round}</strong>',
      seal_missing: ' · left to fill: {n}',
      seal_ready: ' · ready to seal!',
      seal_locked: '🔒 {round} sealed · <strong style="color:var(--gold)">{pts} pts</strong> for played matches',
      seal_group_done: 'Group stage complete',
      seal_ko_pick: 'Knockout: pick a round above',
      seal_round_closed: '🔒 {round} sealed',
      third_need_groups: 'Fill group predictions to build the Round of 32 bracket.',
      third_sealed: 'Group stage sealed. Tables follow your predictions.',
      third_progress: 'Seal all 3 group rounds first ({n}/3). Then knockout opens.',
      third_best: '8 best third-place teams:',
      group_label: 'Group', tag_pred: 'pick', tag_pred_lock: 'pick 🔒', tag_result: 'result',
      tag_locked_time: ' · ⏱ locked (−10 min)', tag_click_bets: ' · tap — who picked what',
      tz_warsaw: 'Warsaw', ko_waiting: 'TBD...', ko_penalty: 'Who advances?',
      match_bets_title: 'Picks on this match', match_bets_empty: 'No sealed picks yet.<br>Add friends\' coupons in <strong>Leaders</strong>.',
      match_bets_head: 'Match picks', self_name: 'Me',
      import_loaded: '✓ Coupon loaded · {rounds} round(s) · {total} pts',
      coupon_closed: 'Sealed: {list}', coupon_next: ' · Next: <strong>{round}</strong>',
      coupon_hint_seal: 'Seal the first round to get your PDF coupon',
      coupon_pdf_n: '📄 PDF ({n} rnd.)',
      round_G1: 'Group — Round 1', round_G2: 'Group — Round 2', round_G3: 'Group — Round 3',
      round_KO1: 'Round of 32', round_KO2: 'Round of 16', round_KO3: 'Quarter-finals', round_KO4: 'Semi-finals', round_KO5: 'Final & 3rd place',
      sync_initial: 'Results: loading...', alert_sync_error: 'Update error: {msg}\nCheck your internet connection.',
      alert_fill_missing: 'Fill {n} more match(es) in this round!', alert_groups_first: 'Seal all 3 group rounds first!',
      alert_seal_ok: 'Round «{round}» sealed!\nPoints this round: {pts}\nTotal: {total}\n\nSave the cumulative PDF coupon — it includes all previous rounds + this one.{next}',
      alert_seal_next: '\n\nBefore «{round}», load this PDF again.', prompt_name: 'What\'s your name?\n\nIt appears on the coupon and leaderboard.',
      alert_no_name: 'You need a name to seal a round and generate a coupon.', alert_enter_name: 'Enter your name above or load a previous coupon.',
      alert_no_ticket: 'Seal a round first — the coupon code appears below.', alert_load_coupon: 'Upload a PDF or paste the coupon code!',
      confirm_replace: 'You already have progress on later rounds. Replace with coupon data?',
      alert_coupon_ok: 'Coupon loaded!\n{lines}\n\nTotal: {total} pts{next}',
      alert_coupon_next: '\n\n→ Fill predictions: «{round}»', alert_coupon_done: '\n\n→ All rounds sealed!',
      alert_coupon_fail: 'Could not read coupon.\n{msg}', confirm_clear_lb: 'Clear the leaderboard?',
      alert_lb_added: 'Added {n} coupon(s) to the leaderboard.', alert_lb_no_codes: 'No new codes found in PDF.',
      alert_copy_first: 'Seal at least one round first!', alert_copied: 'Coupon code copied!',
      alert_copy_fail: 'Could not copy automatically — select text and Ctrl+C', alert_saved: 'Saved!',
      confirm_reset: 'Reset EVERYTHING (predictions, tickets, points)?',
      alert_pdf_first: 'Seal a round with «Seal round» first — then the bookmaker coupon is available.\n\nOn mobile tap «Print / Save PDF» in the coupon window.',
      name_locked_title: 'Name locked in coupon. Use «Reset all» to change.', btn_close: '✕ Close',
      lb_preds: 'Predictions', lb_no_preds: 'No sealed predictions in this coupon.', lb_round_pts: '{round} — {pts} pts',
      lb_third_short: '8×3rd place:', lb_read_fail: 'Unreadable: {n} code(s)', lb_detail_title: '{name} — {total} pts',
      lb_status_added: 'Added {n} coupon(s) · {total} total', import_status: '✓ Loaded {n} round(s) · {total} pts · {hint}',
      import_fill: 'fill «{round}»', import_all_done: 'all rounds sealed', standings_team: 'Team',
      standings_played: 'P', standings_pts: 'Pts', standings_gf: 'GF', standings_ga: 'GA', standings_gd: 'GD',
      ko_penalty_pick: 'Advances (draw):', pred_word: 'pick', match_word: 'Match',
      summary_title: '📋 Prediction: {name}', summary_date: 'Date: {date}', summary_groups: '🏁 Groups (top 2)',
      summary_thirds: '🥉 Best third-place teams', summary_champ: '🏆 Champion', summary_third_place: '🥉 3rd place:',
      summary_pts: '⭐ Points', summary_total: 'Total: {total}', howto_title: '📖 How to play'
    },
    pl: {
      page_title: 'FIFA World Cup 2026 — Typy na mundial',
      sub_brand: 'Typy na drabinkę · <strong>48 drużyn</strong> · 104 mecze · USA · Meksyk · Kanada',
      tab_groups: 'Grupy', tab_knockout: 'Puchar', tab_summary: 'Podsumowanie', tab_leaderboard: 'Liderzy', tab_howto: 'Jak grać',
      score_label: 'Twoje punkty', points_word: 'pkt',
      pts_legend: '3 = dokładny · 2 = różnica bramek · 1 = wynik · 0 = pudło',
      breakdown_empty: 'Zamknij turę — zablokujesz typy i zaczniesz liczyć punkty',
      breakdown_total: 'razem',
      breakdown_was: 'było {n} przy zamknięciu',
      points_short: 'pkt',
      sync_loading: 'Aktualizacja wyników...',
      sync_ok: 'Wyniki ESPN · zaktualizowano {time} · zmieniono {n} mecz(y)',
      sync_fail: 'Nie udało się zaktualizować (wymagany internet). Ostatnie wyniki.',
      sync_no_new: 'Brak nowych wyników — wszystko aktualne.',
      btn_refresh: '🔄 Odśwież wyniki',
      tvp_link: '📺 TVP — piłka na żywo',
      coupon_summary: '🎫 Kupon — wczytaj / kontynuuj grę',
      coupon_help: 'Typ zamyka się <strong>10 min</strong> przed rozpoczęciem (Warszawa). Na zamkniętym meczu — <strong>klik</strong>, aby zobaczyć typy (kupony znajomych w <strong>Liderzy</strong>). Przed kolejną turą — <strong>PDF kuponu</strong> lub «Z kodu poniżej ↑».',
      upload_pdf: '📎 Wczytaj PDF kuponu',
      load_coupon: 'Wczytaj kupon', from_code: 'Z kodu poniżej ↑',
      copy_code: 'Kopiuj kod kuponu', print_coupon: '📄 Drukuj kupon zbiorczy',
      btn_coupon: '📄 Kupon', title_coupon: 'Kupon bukmacherski do druku / PDF',
      placeholder_player: 'Twoje imię...', placeholder_player_locked: 'Gracz',
      placeholder_ticket_in: 'Kod z PDF (na dole) — FIFA26C|...',
      placeholder_ticket_out: 'Kod kuponu pojawi się po zamknięciu tury...',
      progress: 'Postęp: {filled} / 104 · {status}',
      progress_active: 'aktywna: {round}',
      progress_done: 'wszystkie tury zamknięte',
      champ_label: 'Mistrz świata 2026',
      lb_summary: '📥 Import kuponów — tabela liderów',
      lb_help: 'Wgraj <strong>PDF</strong> lub wklej tekst kuponu. <strong>Kliknij imię</strong>, aby zobaczyć wszystkie typy.',
      lb_pdf: '📎 PDF kuponów znajomych',
      placeholder_lb: 'Wklej tekst z PDF lub kuponu (wiele linii OK)...',
      lb_refresh: 'Odśwież tabelę', lb_clear: 'Wyczyść',
      lb_empty: 'Dodaj kupony znajomych — pojawi się tabela.',
      lb_col_player: 'Gracz', lb_col_rounds: 'Tury', lb_col_total: 'Raz.',
      lb_col_pred: 'Typ', lb_col_res: 'Wyn.', lb_col_pts: 'Pkt', lb_col_time: 'Czas', lb_col_match: 'Mecz',
      seal_btn: '🔒 Zamknij turę i zapisz PDF kuponu',
      seal_active: 'Aktywna tura: <strong>{round}</strong>',
      seal_missing: ' · zostało do wpisania: {n}',
      seal_ready: ' · gotowe do zamknięcia!',
      seal_locked: '🔒 {round} zamknięta · <strong style="color:var(--gold)">{pts} pkt</strong> za rozegrane mecze',
      seal_group_done: 'Faza grupowa zakończona',
      seal_ko_pick: 'Puchar: wybierz turę powyżej',
      seal_round_closed: '🔒 {round} zamknięta',
      third_need_groups: 'Wypełnij typy grupowe, aby utworzyć drabinkę 1/16.',
      third_sealed: 'Faza grupowa zamknięta. Tabele według twoich typów.',
      third_progress: 'Najpierw zamknij 3 tury grupowe ({n}/3). Potem puchar.',
      third_best: '8 najlepszych trzecich miejsc:',
      group_label: 'Grupa', tag_pred: 'typ', tag_pred_lock: 'typ 🔒', tag_result: 'wynik',
      tag_locked_time: ' · ⏱ zamknięte (−10 min)', tag_click_bets: ' · klik — kto co typował',
      tz_warsaw: 'Warszawa', ko_waiting: 'Oczekiwanie...', ko_penalty: 'Kto awansuje?',
      match_bets_title: 'Typy na ten mecz', match_bets_empty: 'Brak zablokowanych typów.<br>Dodaj kupony znajomych w <strong>Liderzy</strong>.',
      match_bets_head: 'Typy na mecz', self_name: 'Ja',
      import_loaded: '✓ Kupon wczytany · {rounds} tur(y) · {total} pkt',
      coupon_closed: 'Zamknięte: {list}', coupon_next: ' · Następna: <strong>{round}</strong>',
      coupon_hint_seal: 'Zamknij pierwszą turę — dostaniesz PDF kuponu',
      coupon_pdf_n: '📄 PDF ({n} tur.)',
      round_G1: 'Faza grupowa — kolejka 1', round_G2: 'Faza grupowa — kolejka 2', round_G3: 'Faza grupowa — kolejka 3',
      round_KO1: '1/16 finału', round_KO2: '1/8 finału', round_KO3: '1/4 finału', round_KO4: 'Półfinały', round_KO5: 'Finał i mecz o 3. miejsce',
      sync_initial: 'Wyniki: ładowanie...', alert_sync_error: 'Błąd aktualizacji: {msg}\nSprawdź połączenie z internetem.',
      alert_fill_missing: 'Wypełnij jeszcze {n} mecz(y) w tej turze!', alert_groups_first: 'Najpierw zamknij wszystkie 3 tury grupowe!',
      alert_seal_ok: 'Tura «{round}» zamknięta!\nPunkty w turze: {pts}\nRazem: {total}\n\nZapisz zbiorczy PDF kuponu — zawiera wszystkie poprzednie tury + tę.{next}',
      alert_seal_next: '\n\nPrzed «{round}» wczytaj ten PDF ponownie.', prompt_name: 'Jak masz na imię?\n\nPojawi się na kuponie i w tabeli liderów.',
      alert_no_name: 'Bez imienia nie można zamknąć tury i wygenerować kuponu.', alert_enter_name: 'Wpisz imię u góry lub wczytaj poprzedni kupon.',
      alert_no_ticket: 'Najpierw zamknij turę — kod kuponu pojawi się poniżej.', alert_load_coupon: 'Wgraj PDF lub wklej kod kuponu!',
      confirm_replace: 'Masz już postęp w późniejszych turach. Zastąpić danymi z kuponu?',
      alert_coupon_ok: 'Kupon wczytany!\n{lines}\n\nRazem: {total} pkt{next}',
      alert_coupon_next: '\n\n→ Wypełnij typy: «{round}»', alert_coupon_done: '\n\n→ Wszystkie tury zamknięte!',
      alert_coupon_fail: 'Nie udało się odczytać kuponu.\n{msg}', confirm_clear_lb: 'Wyczyścić tabelę liderów?',
      alert_lb_added: 'Dodano {n} kupon(ów) do tabeli liderów.', alert_lb_no_codes: 'Nie znaleziono nowych kodów w PDF.',
      alert_copy_first: 'Najpierw zamknij co najmniej jedną turę!', alert_copied: 'Kod kuponu skopiowany!',
      alert_copy_fail: 'Nie udało się skopiować — zaznacz tekst i Ctrl+C', alert_saved: 'Zapisano!',
      confirm_reset: 'Zresetować WSZYSTKO (typy, kupony, punkty)?',
      alert_pdf_first: 'Najpierw zamknij turę przyciskiem «Zamknij turę» — wtedy pojawi się kupon do druku.\n\nNa telefonie naciśnij «Drukuj / Zapisz PDF» w oknie kuponu.',
      name_locked_title: 'Imię zablokowane w kuponie. «Reset» — aby zmienić.', btn_close: '✕ Zamknij',
      lb_preds: 'Typy', lb_no_preds: 'Brak zablokowanych typów w kuponie.', lb_round_pts: '{round} — {pts} pkt',
      lb_third_short: '8×3. miejsce:', lb_read_fail: 'Nie odczytano: {n} kod(ów)', lb_detail_title: '{name} — {total} pkt',
      lb_status_added: 'Dodano {n} kupon(ów) · łącznie {total}', import_status: '✓ Wczytano {n} tur(y) · {total} pkt · {hint}',
      import_fill: 'wypełnij «{round}»', import_all_done: 'wszystkie tury zamknięte', standings_team: 'Drużyna',
      standings_played: 'M', standings_pts: 'Pkt', standings_gf: 'BZ', standings_ga: 'BS', standings_gd: 'RB',
      ko_penalty_pick: 'Awansuje (remis):', pred_word: 'typ', match_word: 'Mecz',
      summary_title: '📋 Typy: {name}', summary_date: 'Data: {date}', summary_groups: '🏁 Grupy (top 2)',
      summary_thirds: '🥉 Awansują 3. miejsca', summary_champ: '🏆 Mistrz', summary_third_place: '🥉 3. miejsce:',
      summary_pts: '⭐ Punkty', summary_total: 'Razem: {total}', howto_title: '📖 Jak grać'
    }
  };

  const HOWTO = {
    uk: [
      { t: 'Мета', b: '<p>Заповни прогнози на матчі ЧС-2026, закривай тури купоном і змагайся з друзями за очки. Чим точніший прогноз — тим більше балів.</p>' },
      { t: 'Крок 1 — прогноз', b: '<p>На вкладці <strong>Групи</strong> або <strong>Плей-оф</strong> введи рахунок у полях. Активний лише <em>поточний тур</em>. У плей-оф при нічиї обери переможця пенальті.</p>' },
      { t: 'Крок 2 — закрити тур', b: '<p>Заповни всі матчі туру → прокрути вниз → <strong>«🔒 Закрити тур»</strong>. Зʼявиться PDF-купон і код. Збережи його — без купона не продовжиш на іншому пристрої.</p>' },
      { t: 'Очки', b: '<ul><li><strong>3</strong> — точний рахунок</li><li><strong>2</strong> — вірна різниця голів</li><li><strong>1</strong> — вірний результат (W/D/L)</li><li><strong>0</strong> — промах</li></ul>' },
      { t: 'Час і дедлайн', b: '<p>Час старту — <strong>Варшава</strong>. Прогноз блокується за <strong>10 хвилин</strong> до свистка. На закритому матчі <strong>клікни</strong>, щоб побачити типи (свій + друзів з «Лідерів»).</p>' },
      { t: 'Купон і PDF', b: '<p><strong>Завантажити купон</strong> — перед новим туром. <strong>«З коду внизу ↑»</strong> — найнадійніший імпорт. PDF друкуй через <strong>«📄 Купон»</strong> або після закриття туру.</p>' },
      { t: 'Лідерборд', b: '<p>Вкладка <strong>Лідери</strong>: встав коди або PDF друзів → <strong>Оновити таблицю</strong>. Клік по імені — деталі всіх прогнозів.</p>' },
      { t: 'Поради', b: '<ul><li>Імʼя вводиться один раз при першому закритті туру</li><li>Результати — кнопка «Оновити» або при завантаженні сторінки</li><li>Трансляції: посилання TVP у верхній панелі</li></ul>' }
    ],
    en: [
      { t: 'Goal', b: '<p>Predict World Cup 2026 matches, seal each round with a coupon, and compete with friends. More accurate picks = more points.</p>' },
      { t: 'Step 1 — predict', b: '<p>On <strong>Groups</strong> or <strong>Knockout</strong>, enter scores. Only the <em>current round</em> is editable. In KO, pick a penalty winner on draws.</p>' },
      { t: 'Step 2 — seal round', b: '<p>Fill all matches → scroll down → <strong>«Seal round»</strong>. You get a PDF coupon and code. Save it to continue on another device.</p>' },
      { t: 'Scoring', b: '<ul><li><strong>3</strong> — exact score</li><li><strong>2</strong> — correct goal difference</li><li><strong>1</strong> — correct outcome (W/D/L)</li><li><strong>0</strong> — miss</li></ul>' },
      { t: 'Time & deadline', b: '<p>Kickoff times are <strong>Warsaw</strong>. Picks lock <strong>10 minutes</strong> before start. <strong>Click</strong> a closed match to see picks (yours + friends from Leaders).</p>' },
      { t: 'Coupon & PDF', b: '<p><strong>Load coupon</strong> before each new round. <strong>«From code below ↑»</strong> is the most reliable import. Print via <strong>«Coupon»</strong> in the header or after sealing.</p>' },
      { t: 'Leaderboard', b: '<p><strong>Leaders</strong> tab: paste friends\' codes or PDFs → <strong>Update table</strong>. Click a name for full pick history.</p>' },
      { t: 'Tips', b: '<ul><li>Name is set on first seal and then locked</li><li>Refresh results with the button or on page load</li><li>Free streams: TVP link in the top bar</li></ul>' }
    ],
    pl: [
      { t: 'Cel gry', b: '<p>Typuj mecze MŚ 2026, zamykaj tury kuponem i rywalizuj ze znajomymi. Im trafniej — tym więcej punktów.</p>' },
      { t: 'Krok 1 — typ', b: '<p>W zakładkach <strong>Grupy</strong> lub <strong>Puchar</strong> wpisz wynik. Edytowalna jest tylko <em>bieżąca tura</em>. W pucharze przy remisie wybierz zwycięzcę karnych.</p>' },
      { t: 'Krok 2 — zamknij turę', b: '<p>Wypełnij wszystkie mecze → przewiń w dół → <strong>«Zamknij turę»</strong>. Dostaniesz PDF i kod kuponu. Zapisz go, by kontynuować na innym urządzeniu.</p>' },
      { t: 'Punktacja', b: '<ul><li><strong>3</strong> — dokładny wynik</li><li><strong>2</strong> — poprawna różnica bramek</li><li><strong>1</strong> — poprawny wynik (W/D/L)</li><li><strong>0</strong> — pudło</li></ul>' },
      { t: 'Czas i deadline', b: '<p>Godziny startu — <strong>Warszawa</strong>. Typ zamyka się <strong>10 minut</strong> przed gwizdkiem. <strong>Kliknij</strong> zamknięty mecz, by zobaczyć typy (twoje + znajomych z Liderzy).</p>' },
      { t: 'Kupon i PDF', b: '<p><strong>Wczytaj kupon</strong> przed kolejną turą. <strong>«Z kodu poniżej ↑»</strong> — najpewniejszy import. Drukuj przez <strong>«Kupon»</strong> w nagłówku lub po zamknięciu tury.</p>' },
      { t: 'Tabela liderów', b: '<p>Zakładka <strong>Liderzy</strong>: wklej kody lub PDF znajomych → <strong>Odśwież tabelę</strong>. Kliknij imię po szczegóły.</p>' },
      { t: 'Wskazówki', b: '<ul><li>Imię ustawiane przy pierwszym zamknięciu tury</li><li>Wyniki — przycisk odświeżania lub przy ładowaniu strony</li><li>Transmisje: link TVP u góry</li></ul>' }
    ]
  };

  let lang = 'uk';
  try {
    const s = localStorage.getItem('fifa2026lang');
    if (s && I18N[s]) lang = s;
  } catch (e) { /* ignore */ }

  function t(key, vars) {
    let s = I18N[lang]?.[key] ?? I18N.uk[key] ?? key;
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.split(`{${k}}`).join(String(v)); });
    return s;
  }

  function roundLabel(rid) {
    return t('round_' + rid);
  }

  function getHowtoHtml() {
    return HOWTO[lang].map(s => `<section class="howto-section"><h4>${s.t}</h4>${s.b}</section>`).join('');
  }

  const TEAM_EN = {
    MEX:'Mexico',RSA:'South Africa',KOR:'South Korea',CZE:'Czechia',CAN:'Canada',BIH:'Bosnia',QAT:'Qatar',SUI:'Switzerland',
    BRA:'Brazil',MAR:'Morocco',HAI:'Haiti',SCO:'Scotland',USA:'USA',PAR:'Paraguay',AUS:'Australia',TUR:'Türkiye',
    GER:'Germany',CUW:'Curaçao',CIV:'Ivory Coast',ECU:'Ecuador',NED:'Netherlands',JPN:'Japan',SWE:'Sweden',TUN:'Tunisia',
    BEL:'Belgium',EGY:'Egypt',IRN:'Iran',NZL:'New Zealand',ESP:'Spain',CPV:'Cape Verde',KSA:'Saudi Arabia',URU:'Uruguay',
    FRA:'France',SEN:'Senegal',IRQ:'Iraq',NOR:'Norway',ARG:'Argentina',ALG:'Algeria',AUT:'Austria',JOR:'Jordan',
    POR:'Portugal',COD:'DR Congo',UZB:'Uzbekistan',COL:'Colombia',ENG:'England',CRO:'Croatia',GHA:'Ghana',PAN:'Panama'
  };

  const TEAM_PL = {
    MEX:'Meksyk',RSA:'RPA',KOR:'Korea Płd.',CZE:'Czechy',CAN:'Kanada',BIH:'Bośnia',QAT:'Katar',SUI:'Szwajcaria',
    BRA:'Brazylia',MAR:'Maroko',HAI:'Haiti',SCO:'Szkocja',USA:'USA',PAR:'Paragwaj',AUS:'Australia',TUR:'Turcja',
    GER:'Niemcy',CUW:'Curaçao',CIV:'Wybrzeże Kości Słoniowej',ECU:'Ekwador',NED:'Holandia',JPN:'Japonia',SWE:'Szwecja',TUN:'Tunezja',
    BEL:'Belgia',EGY:'Egipt',IRN:'Iran',NZL:'Nowa Zelandia',ESP:'Hiszpania',CPV:'Rep. Zielonego Przylądka',KSA:'Arabia Saudyjska',URU:'Urugwaj',
    FRA:'Francja',SEN:'Senegal',IRQ:'Irak',NOR:'Norwegia',ARG:'Argentyna',ALG:'Algieria',AUT:'Austria',JOR:'Jordania',
    POR:'Portugalia',COD:'DR Kongo',UZB:'Uzbekistan',COL:'Kolumbia',ENG:'Anglia',CRO:'Chorwacja',GHA:'Ghana',PAN:'Panama'
  };

  function teamName(code) {
    if (lang === 'en') return TEAM_EN[code] || null;
    if (lang === 'pl') return TEAM_PL[code] || null;
    return null;
  }

  function setLang(l) {
    if (!I18N[l]) return;
    lang = l;
    try { localStorage.setItem('fifa2026lang', l); } catch (e) { /* ignore */ }
    document.documentElement.lang = l === 'uk' ? 'uk' : l;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === l);
    });
    if (typeof window.onLangChange === 'function') window.onLangChange();
  }

  window.t = t;
  window.roundLabel = roundLabel;
  window.getHowtoHtml = getHowtoHtml;
  window.teamName = teamName;
  window.setLang = setLang;
  window.getLang = () => lang;
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
})();
