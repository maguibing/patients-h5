<script setup lang="ts">
import type { Image } from '@/types/consult'
import { IllnessTime, MsgType } from '@/enum'
import { flagOptions, timeOptions } from '@/services/constants'
import type { Message } from '@/types/room'
import { ImagePreview } from 'vant'
defineProps<{ list: Message[] }>()

const getIllnessTimeText = (time: IllnessTime) =>
  timeOptions.find((item) => item.value === time)?.label

const getConsultFlagText = (flag: 0 | 1) =>
  flagOptions.find((item) => item.value === flag)?.label

const previewImg = (pictures?: Image[]) => {
  console.log(pictures)
  if (pictures && pictures.length)
    ImagePreview(pictures.map((item) => item.url))
}
</script>

<template>
  <template v-for="{ msgType, msg } in list" :key="msg.id">
    <!-- 病情描述 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom" v-if="msg.consultRecord">
        <p>
          {{ msg.consultRecord.patientInfo.name }}
          {{ msg.consultRecord.patientInfo.genderValue }}
          {{ msg.consultRecord.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="previewImg(msg.consultRecord?.pictures)">
          点击查看
        </van-col>
      </van-row>
    </div>
    <!-- 温馨提示 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <!-- 通用通知 -->
    <div class="msg msg-tip" v-if="msgType === 31">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.msg {
  display: flex;
  padding: 15px;

  // 医生消息+图片
  &-from {
    .content {
      max-width: 240px;
      min-width: 52px;

      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
      }

      .pao {
        padding: 15px;
        background-color: #fff;
        color: var(--cp-text3);
        font-size: 15px;
        border-radius: 8px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: #fff;
          border-top-left-radius: 13px 3px;
        }

        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-right-radius: 13px 13px;
        }
      }

      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }

    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }

  // 患者消息+图片
  &-to {
    justify-content: flex-end;

    .content {
      max-width: 240px;
      min-width: 52px;

      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
        text-align: right;
      }

      .pao {
        padding: 15px;
        background-color: var(--cp-primary);
        color: #fff;
        font-size: 15px;
        border-radius: 8px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          right: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: var(--cp-primary);
          border-top-right-radius: 13px 3px;
        }

        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-left-radius: 13px 13px;
        }
      }

      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }

    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 13px;
    }
  }

  &-tip {
    justify-content: center;
    font-size: 12px;

    .content {
      height: 34px;
      line-height: 34px;
      background-color: #fff;
      color: var(--cp-tip);
      font-size: 12px;
      border-radius: 17px;
      padding: 0 16px;
      max-width: 100%;

      .green {
        color: var(--cp-primary);
      }
    }

    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }

  &-illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;

    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;

      > p {
        &:first-child {
          font-size: 16px;
        }

        &:last-child {
          margin-top: 5px;
          color: var(--cp-tip);
        }
      }
    }

    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }

      &:nth-child(2n) {
        color: var(--cp-tip);
      }
    }
  }

  &-recipe {
    padding: 15px;

    .content {
      background-color: #fff;
      border-radius: 8px;
      color: var(--cp-tip);
      font-size: 12px;
      flex: 1;

      .head {
        padding: 15px;

        .head-tit {
          display: flex;
          justify-content: space-between;

          > h3 {
            font-weight: normal;
            font-size: 16px;
            color: var(--cp-text1);
          }
        }

        p {
          margin-top: 5px;
        }
      }

      .body {
        padding: 15px 15px 0 15px;

        &-item {
          display: flex;
          margin-bottom: 15px;

          .durg {
            flex: 1;

            > p {
              &:first-child {
                font-size: 14px;
                color: var(--cp-text1);
                margin-bottom: 5px;
              }
            }
          }

          .num {
            color: var(--cp-text1);
          }
        }
      }

      .foot {
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 16px;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
