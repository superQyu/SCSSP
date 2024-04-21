import logo from '@/assets/logo/140-140.png';
import title from '@/assets/logo/title.png';
import flogo from '@/assets/logo/logo.png';

// Proxy Prefix
const prefix: object = {
  static: '/static',
};

// field conversion
const fieldConversion: object = {
  user: 'user',
  ico: 'ico',
};

// 文字介绍
const describe: string =
  '智慧工地监管平台是基于先进技术和数据分析的创新解决方案，旨在提升工地管理的效率、安全性和可持续性。';

// 
const PLATFORMID = 2583;

export { PLATFORMID, logo, title, flogo, prefix, fieldConversion, describe };

export enum DICT_TYPE {
  USER_TYPE = 'user_type',
  COMMON_STATUS = 'common_status',
  TERMINAL = 'terminal', // 终端

  // ========== SYSTEM 模块 ==========
  SYSTEM_USER_SEX = 'system_user_sex',
  SYSTEM_MENU_TYPE = 'system_menu_type',
  SYSTEM_ROLE_TYPE = 'system_role_type',
  SYSTEM_DATA_SCOPE = 'system_data_scope',
  SYSTEM_NOTICE_TYPE = 'system_notice_type',
  SYSTEM_OPERATE_TYPE = 'system_operate_type',
  SYSTEM_LOGIN_TYPE = 'system_login_type',
  SYSTEM_LOGIN_RESULT = 'system_login_result',
  SYSTEM_SMS_CHANNEL_CODE = 'system_sms_channel_code',
  SYSTEM_SMS_TEMPLATE_TYPE = 'system_sms_template_type',
  SYSTEM_SMS_SEND_STATUS = 'system_sms_send_status',
  SYSTEM_SMS_RECEIVE_STATUS = 'system_sms_receive_status',
  SYSTEM_ERROR_CODE_TYPE = 'system_error_code_type',
  SYSTEM_OAUTH2_GRANT_TYPE = 'system_oauth2_grant_type',
  SYSTEM_MAIL_SEND_STATUS = 'system_mail_send_status',
  SYSTEM_NOTIFY_TEMPLATE_TYPE = 'system_notify_template_type',
  SYSTEM_SOCIAL_TYPE = 'system_social_type',

  // ========== INFRA 模块 ==========
  INFRA_BOOLEAN_STRING = 'infra_boolean_string',
  INFRA_JOB_STATUS = 'infra_job_status',
  INFRA_JOB_LOG_STATUS = 'infra_job_log_status',
  INFRA_API_ERROR_LOG_PROCESS_STATUS = 'infra_api_error_log_process_status',
  INFRA_CONFIG_TYPE = 'infra_config_type',
  INFRA_CODEGEN_TEMPLATE_TYPE = 'infra_codegen_template_type',
  INFRA_CODEGEN_FRONT_TYPE = 'infra_codegen_front_type',
  INFRA_CODEGEN_SCENE = 'infra_codegen_scene',
  INFRA_FILE_STORAGE = 'infra_file_storage',

  // ========== BPM 模块 ==========
  BPM_MODEL_CATEGORY = 'bpm_model_category',
  BPM_MODEL_FORM_TYPE = 'bpm_model_form_type',
  BPM_TASK_ASSIGN_RULE_TYPE = 'bpm_task_assign_rule_type',
  BPM_PROCESS_INSTANCE_STATUS = 'bpm_process_instance_status',
  BPM_PROCESS_INSTANCE_RESULT = 'bpm_process_instance_result',
  BPM_TASK_ASSIGN_SCRIPT = 'bpm_task_assign_script',
  BPM_OA_LEAVE_TYPE = 'bpm_oa_leave_type',

  // ========== PAY 模块 ==========
  PAY_CHANNEL_CODE = 'pay_channel_code', // 支付渠道编码类型
  PAY_ORDER_STATUS = 'pay_order_status', // 商户支付订单状态
  PAY_REFUND_STATUS = 'pay_refund_status', // 退款订单状态
  PAY_NOTIFY_STATUS = 'pay_notify_status', // 商户支付回调状态
  PAY_NOTIFY_TYPE = 'pay_notify_type', // 商户支付回调状态
  PAY_TRANSFER_STATUS = 'pay_transfer_status', // 转账订单状态
  PAY_TRANSFER_TYPE = 'pay_transfer_type', // 转账订单状态

  // ========== MP 模块 ==========
  MP_AUTO_REPLY_REQUEST_MATCH = 'mp_auto_reply_request_match', // 自动回复请求匹配类型
  MP_MESSAGE_TYPE = 'mp_message_type', // 消息类型

  // ========== MALL - 会员模块 ==========
  MEMBER_POINT_BIZ_TYPE = 'member_point_biz_type', // 积分的业务类型
  MEMBER_EXPERIENCE_BIZ_TYPE = 'member_experience_biz_type', // 会员经验业务类型

  // ========== MALL - 商品模块 ==========
  PRODUCT_SPU_STATUS = 'product_spu_status', //商品状态

  // ========== MALL - 交易模块 ==========
  EXPRESS_CHARGE_MODE = 'trade_delivery_express_charge_mode', //快递的计费方式
  TRADE_AFTER_SALE_STATUS = 'trade_after_sale_status', // 售后 - 状态
  TRADE_AFTER_SALE_WAY = 'trade_after_sale_way', // 售后 - 方式
  TRADE_AFTER_SALE_TYPE = 'trade_after_sale_type', // 售后 - 类型
  TRADE_ORDER_TYPE = 'trade_order_type', // 订单 - 类型
  TRADE_ORDER_STATUS = 'trade_order_status', // 订单 - 状态
  TRADE_ORDER_ITEM_AFTER_SALE_STATUS = 'trade_order_item_after_sale_status', // 订单项 - 售后状态
  TRADE_DELIVERY_TYPE = 'trade_delivery_type', // 配送方式
  BROKERAGE_ENABLED_CONDITION = 'brokerage_enabled_condition', // 分佣模式
  BROKERAGE_BIND_MODE = 'brokerage_bind_mode', // 分销关系绑定模式
  BROKERAGE_BANK_NAME = 'brokerage_bank_name', // 佣金提现银行
  BROKERAGE_WITHDRAW_TYPE = 'brokerage_withdraw_type', // 佣金提现类型
  BROKERAGE_RECORD_BIZ_TYPE = 'brokerage_record_biz_type', // 佣金业务类型
  BROKERAGE_RECORD_STATUS = 'brokerage_record_status', // 佣金状态
  BROKERAGE_WITHDRAW_STATUS = 'brokerage_withdraw_status', // 佣金提现状态

  // ========== MALL - 营销模块 ==========
  PROMOTION_DISCOUNT_TYPE = 'promotion_discount_type', // 优惠类型
  PROMOTION_PRODUCT_SCOPE = 'promotion_product_scope', // 营销的商品范围
  PROMOTION_COUPON_TEMPLATE_VALIDITY_TYPE = 'promotion_coupon_template_validity_type', // 优惠劵模板的有限期类型
  PROMOTION_COUPON_STATUS = 'promotion_coupon_status', // 优惠劵的状态
  PROMOTION_COUPON_TAKE_TYPE = 'promotion_coupon_take_type', // 优惠劵的领取方式
  PROMOTION_ACTIVITY_STATUS = 'promotion_activity_status', // 优惠活动的状态
  PROMOTION_CONDITION_TYPE = 'promotion_condition_type', // 营销的条件类型枚举
  PROMOTION_BARGAIN_RECORD_STATUS = 'promotion_bargain_record_status', // 砍价记录的状态
  PROMOTION_COMBINATION_RECORD_STATUS = 'promotion_combination_record_status', // 拼团记录的状态
  PROMOTION_BANNER_POSITION = 'promotion_banner_position', // banner 定位

  // ========== CRM - 客户管理模块 ==========
  CRM_AUDIT_STATUS = 'crm_audit_status', // CRM 审批状态
  CRM_BIZ_TYPE = 'crm_biz_type', // CRM 业务类型
  CRM_RECEIVABLE_RETURN_TYPE = 'crm_receivable_return_type', // CRM 回款的还款方式
  CRM_CUSTOMER_INDUSTRY = 'crm_customer_industry',
  CRM_CUSTOMER_LEVEL = 'crm_customer_level',
  CRM_CUSTOMER_SOURCE = 'crm_customer_source',
  CRM_PRODUCT_STATUS = 'crm_product_status',
  CRM_PERMISSION_LEVEL = 'crm_permission_level', // CRM 数据权限的级别
  CRM_PRODUCT_UNIT = 'crm_product_unit', // 产品单位
  CRM_FOLLOW_UP_TYPE = 'crm_follow_up_type' // 跟进方式
}
