<script setup lang="ts">
import {
  getPatientList,
  addPatient,
  editPatient,
  delPatient
} from '@/services/user'
import type { PatientList, Patient } from '@/types/user'
import { onMounted, ref, computed } from 'vue'
import IdValidator from 'id-validator'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'
const route = useRoute()
const router = useRouter()
const store = useConsultStore()
const patientList = ref<PatientList>([])
const isChange = computed(() => route.query.isChange === '1')
const show = ref(false)
const options = [
  { label: '女', value: 0 },
  { label: '男', value: 1 }
]

const initPatient: Patient = {
  name: '',
  gender: 1,
  defaultFlag: 0,
  idCard: '11010119890512132X'
}

const patientId = ref<string>()
const selectedPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}

const patient = ref<Patient>({
  ...initPatient
})

const loadPatientList = async () => {
  const res = await getPatientList()
  patientList.value = res.data

  // 设置默认选中的ID，当你是选择患者的时候，且有患者信息的时候
  if (isChange.value && patientList.value.length) {
    const defPatient = patientList.value.find((item) => item.defaultFlag === 1)
    if (defPatient) patientId.value = defPatient.id
    else patientId.value = patientList.value[0].id
  }
}

const showPopup = () => {
  patient.value = { ...initPatient }
  show.value = true
}
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

const onFinish = async () => {
  if (!patient.value.name) return
  if (!patient.value.idCard) return
  const validate = new IdValidator()
  if (!validate.isValid(patient.value.idCard)) return Toast('身份证号不正确')

  patient.value.id
    ? await editPatient({
        name: patient.value.name,
        idCard: patient.value.idCard,
        defaultFlag: patient.value.defaultFlag,
        gender: patient.value.gender,
        id: patient.value.id
      })
    : await addPatient(patient.value)
  await loadPatientList()
  show.value = false
}

const editPatientFnc = (data: Patient) => {
  show.value = true
  patient.value = { ...data }
}

const delPatientFnc = async () => {
  await delPatient(patient.value.id + '')
  loadPatientList()
  show.value = false
}

const next = () => {
  if (!patientId.value) return
  store.setPatient(patientId.value)
  router.push('/consult/pay')
}

onMounted(() => {
  loadPatientList()
})
</script>

<template>
  <div class="patient-page">
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <div class="patient-list">
      <div
        class="patient-item"
        v-for="item in patientList"
        :key="item.id"
        @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2')
          }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit" @click="editPatientFnc(item)" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div
        class="patient-add"
        v-if="patientList.length < 6"
        @click="showPopup()"
      >
        <div class="patient-tip">最多可添加 6 人</div>
      </div>
    </div>

    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :back="() => (show = !show)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="onFinish"
      >
      </cp-nav-bar>
      <van-form autocomplete="off" ref="form">
        <van-field
          label="真实姓名"
          placeholder="请输入真实姓名"
          v-model="patient.name"
        />
        <van-field
          label="身份证号"
          placeholder="请输入身份证号"
          v-model="patient.idCard"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn
              :options="options"
              v-model="patient.gender"
            ></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="delPatientFnc()"
          >删除</van-action-bar-button
        >
      </van-action-bar>
    </van-popup>
    <div class="patient-next" v-if="isChange">
      <van-button type="primary" round block @click="next">下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;

  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }

    .van-action-bar {
      padding: 0 10px;
      margin-bottom: 10px;

      .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
      }
    }
  }
}

.patient-list {
  padding: 15px;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;

  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;

      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }

      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }

  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }

  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);

    .icon {
      color: var(--cp-primary);
    }
  }
}

.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;

  .cp-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}

.pb4 {
  padding-bottom: 4px;
}

.patient-change {
  padding: 15px;

  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }

  > p {
    color: var(--cp-text3);
  }
}

.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>
