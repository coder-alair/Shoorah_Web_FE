import { lazy } from 'react';
import Login from '../container/Login';
import ResetPassword from '../container/ResetPassword';
import ChangePassword from '../container/ChangePassword';
import Notification from '../container/Notification';
import Personalize from '../container/Personalize';
import Rituals from '../contents/rituals/rituals';
import Journals from '../contents/journal/journal';
import JournalGratitude from '../contents/journal/journalAddGratitude';
import Gratitude from '../contents/journal/gratitude';
import Affirmation from '../contents/journal/affirmation';
import Cleanse from '../contents/journal/cleanse';
import JournalCleanse from '../contents/journal/journalAddCleanse';
import Goals from '../contents/journal/goals';
import JournalGoals from '../contents/journal/journalAddGoals';
import Notepad from '../contents/journal/notepad';
import JournalNotes from '../contents/journal/journalAddNotes';
import EditGratitude from '../contents/journal/EditGratitude';
import EditCleanse from '../contents/journal/editCleanse';
import EditNote from '../contents/journal/editNotes';
import EditGoal from '../contents/journal/editGoal';
import Me from '../contents/me/me';
import SettingPage from '../contents/me/setting/settingPage';
import Review from '../contents/me/setting/review';
import Subscription from '../contents/me/setting/subscription';
import Account from '../contents/me/setting/account';
import CompanyUserLandingPage from '../contents/companyUserLandingPage';
import AddAffirmation from '../contents/journal/addAffirmation';
import EditAffirmation from '../contents/journal/editAffirmation';
import Restore from '../contents/restore/restore';
import Explore from '../contents/explore/explore';
import ShoorahPods from '../contents/explore/shoorahPods';
import SoundPlayerPage from '../contents/reusable/soundPlayer';
import Shuru from '../contents/shuru/shuru';
import ShuruSelection from '../contents/shuru/shuruHome/shuruSelection';
import ShuruProfile from '../contents/shuru/shuruProfile';
import MoodsHome from '../contents/me/setting/moods/moodsHome';
import BookmarksPage from '../contents/home/bookmarks/bookmarks';
import MeditationsPage from '../contents/restore/meditations';
import SleepsPage from '../contents/restore/sleeps';
import BadgesScreen from '../contents/badges/badges';
import Legals from '../contents/me/setting/legals/legals';
import Faqs from '../contents/me/setting/legals/faqs';
import Terms from '../contents/me/setting/legals/pages/Terms';
import Privacy from '../contents/me/setting/legals/pages/privacy';
import ShuruDisclaimer from '../contents/me/setting/legals/pages/shuruDisclaimer';
import AboutUs from '../contents/me/setting/legals/pages/aboutUs';
import WebTerms from '../contents/me/setting/legals/pages/webTerms';
import InternetPolicy from '../contents/me/setting/legals/pages/internetPolicy';
import ServiceConsumer from '../contents/me/setting/legals/pages/supplyConsumer';
import CookiePolicy from '../contents/me/setting/legals/pages/cookiePolicy';

const Home = lazy(() => import('../contents/home/home'));
const ForgotPassword = lazy(() => import('../container/ForgotPassword'));

const routes = [
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: Home,
    private: false,
  },
  {
    path: '/rituals',
    exact: true,
    name: 'Rituals',
    component: Rituals,
    private: false,
  },
  {
    path: '/journal',
    exact: true,
    name: 'Journals',
    component: Journals,
    private: false,
  },
  {
    path: '/journal/gratitude',
    exact: true,
    name: 'Gratitude',
    component: Gratitude,
    private: false,
  },
  {
    path: '/journal/add-gratitude',
    exact: true,
    name: 'Add Gratitude',
    component: JournalGratitude,
    private: false,
  },
  {
    path: '/journal/edit-gratitude',
    exact: true,
    name: 'Edit Gratitude',
    component: EditGratitude,
    private: false,
  },
  {
    path: '/journal/affirmation',
    exact: true,
    name: 'Affirmations',
    component: Affirmation,
    private: false,
  },
  {
    path: '/journal/add-affirmation',
    exact: true,
    name: 'Add Affirmation',
    component: AddAffirmation,
    private: false
  },
  {
    path: '/journal/edit-affirmation',
    exact: true,
    name: 'Edit Affirmation',
    component: EditAffirmation,
    private: false
  },
  {
    path: '/journal/cleanse',
    exact: true,
    name: 'Cleanse',
    component: Cleanse,
    private: false,
  },
  {
    path: '/journal/add-cleanse',
    exact: true,
    name: 'Add Cleanse',
    component: JournalCleanse,
    private: false,
  },
  {
    path: '/journal/edit-cleanse',
    exact: true,
    name: 'Edit Cleanse',
    component: EditCleanse,
    private: false,
  },
  {
    path: '/journal/goals',
    exact: true,
    name: 'Goals',
    component: Goals,
    private: false,
  },
  {
    path: '/journal/add-goals',
    exact: true,
    name: 'Add Goals',
    component: JournalGoals,
    private: false,
  },
  {
    path: '/journal/edit-goal',
    exact: true,
    name: 'Edit Goals',
    component: EditGoal,
    private: false,
  },
  {
    path: '/journal/notepad',
    exact: true,
    name: 'Notepad',
    component: Notepad,
    private: false,
  },
  {
    path: '/journal/add-notes',
    exact: true,
    name: 'Add Notes',
    component: JournalNotes,
    private: false,
  },
  {
    path: '/journal/edit-note',
    exact: true,
    name: 'Edit Notes',
    component: EditNote,
    private: false,
  },
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: Login,
    private: false,
  },
  {
    path: '/forgot-password',
    exact: true,
    name: 'ForgotPassword',
    component: ForgotPassword,
    private: false,
  },
  {
    path: '/reset-password',
    exact: true,
    name: 'ResetPassword',
    component: ResetPassword,
    private: false,
  },
  {
    path: '/change-password',
    exact: true,
    name: 'ChangePassword',
    component: ChangePassword,
    private: false,
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Notification',
    component: Notification,
    private: false,
  },
  {
    path: '/personalize',
    exact: true,
    name: 'Personalize',
    component: Personalize,
    private: false,
  },
  {
    path: '/me',
    exact: true,
    name: 'Me',
    component: Me,
    private: false,
  },
  {
    path: '/me/setting',
    exact: true,
    name: 'Setting',
    component: SettingPage,
    private: false,
  },
  {
    path: '/terms&conditions',
    exact: true,
    name: 'Terms & Conditions',
    component: Terms,
    private: false,
  },
  {
    path: '/privacy-policy',
    exact: true,
    name: 'Privacy Policy',
    component: Privacy,
    private: false,
  },
  {
    path: '/shuru-disclaimer',
    exact: true,
    name: 'Shuru Disclaimer',
    component: ShuruDisclaimer,
    private: false,
  },
  {
    path: '/about-us',
    exact: true,
    name: 'About Us',
    component: AboutUs,
    private: false,
  },
  {
    path: '/website-terms-conditions',
    exact: true,
    name: 'Website Terms Conditions',
    component: WebTerms,
    private: false,
  },
  {
    path: '/information-security-policy',
    exact: true,
    name: 'Information Security Policy',
    component: InternetPolicy,
    private: false,
  },
  {
    path: '/terms&conditions-for-supply-of-services-to-consumers',
    exact: true,
    name: 'Supply Services to Consumers',
    component: ServiceConsumer,
    private: false,
  },
  {
    path: '/cookie-policy',
    exact: true,
    name: 'Cookie policy',
    component: CookiePolicy,
    private: false,
  },
  
  {
    path: '/review',
    exact: true,
    name: 'Review',
    component: Review,
    private: false,
  },
  {
    path: '/subscription',
    exact: true,
    name: 'Subscription',
    component: Subscription,
    private: false,
  },
  {
    path: '/account',
    exact: true,
    name: 'Account',
    component: Account,
    private: false,
  },
  {
    path: '/companyProfileEdit',
    exact: true,
    name: 'Company Profile Edit',
    component: CompanyUserLandingPage,
    private: false,
  },
  {
    path: '/moods',
    exact: true,
    name: 'Moods',
    component: MoodsHome,
    private: false,
  },
  {
    path: '/restore',
    exact: true,
    name: 'Restore',
    component: Restore,
    private: false,
  },
  {
    path: '/explore',
    exact: true,
    name: 'Explore',
    component: Explore,
    private: false,
  },
  {
    path: '/shoorah-pods',
    exact: true,
    name: 'Shoorah Pods',
    component: ShoorahPods,
    private: false,
  },
  {
    path: '/soundplayer/type/:type/content/:id',
    exact: true,
    name: 'SoundPlayer',
    component: SoundPlayerPage,
    private: false,
  },
  {
    path: '/shuru',
    exact: true,
    name: 'Shuru',
    component: Shuru,
    private: false,
  },
  {
    path: '/shuru-selection',
    exact: true,
    name: 'ShuruSelection',
    component: ShuruSelection,
    private: false,
  },
  {
    path: '/shuru-profile',
    exact: true,
    name: 'ShuruProfile',
    component: ShuruProfile,
    private: false,
  },
  {
    path: '/bookmarks',
    exact: true,
    name: 'Bookmarks',
    component: BookmarksPage,
    private: false,
  },
  {
    path: '/meditations',
    exact: true,
    name: 'Meditations',
    component: MeditationsPage,
    private: false,
  },
  {
    path: '/sleeps',
    exact: true,
    name: 'Sleeps',
    component: SleepsPage,
    private: false,
  },
  {
    path: '/my-badges',
    exact: true,
    name: 'Badges',
    component: BadgesScreen,
    private: false,
  },
  {
    path: '/legals',
    exact: true,
    name: 'Legals',
    component: Legals,
    private: false,
  },
  {
    path: '/faqs',
    exact: true,
    name: 'Faqs',
    component: Faqs,
    private: false,
  }


];




export default routes;
