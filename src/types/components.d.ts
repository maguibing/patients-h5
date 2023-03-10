import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import knowledgeCard from '@/components/knowledge-card.vue'
import knowledgeList from '@/components/knowledge-list.vue'
import followDoctor from '@/components/follow-doctor.vue'
import doctorCard from '@/components/doctor-card.vue'

declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
    cpRadioBtn: typeof cpRadioBtn
    knowledgeCard: typeof knowledgeCard
    knowledgeList: typeof knowledgeList
    followDoctor: typeof followDoctor
    doctorCard: typeof doctorCard
  }
}
