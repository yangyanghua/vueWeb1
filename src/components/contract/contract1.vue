<template>
  <div class="contract1">
    <div class="ct_detai">
      <p class="agreementNo" v-if="$route.query.cNumber">
        协议编号：{{$route.query.cNumber}}
      </p>
      <p>甲方：广州闪购软件服务有限公司	（以下简称“甲方”或者“闪购”）</p>
      <p>地址：广州市天河区珠江东路32号利通广场21层</p>
      <p><span style="display: inline-block;width: 200px;">授权联系人：余绍雄 </span><span style="display: inline-block;width: 200px;">联系电话：18988918912</span></p>
      <br />
      <p>乙方：{{contractData.name}}（以下简称“乙方”）</p>
      <p>地址：{{contractData.address}} </p>
       <p><span style="display: inline-block;width: 200px;">授权联系人：{{contractData.legalPerson}} </span><span style="display: inline-block;width: 200px;">联系电话：{{contractData.contactTel}}</span></p>
      <br />
      <p>鉴于甲乙双方正在进行会谈或合作，需要取得或者知悉甲方的商业秘密。为了明确乙方的保密义务，甲乙双方本着互惠互利、共同发展的原则，经友好协商签订本协议。</p>
      <p>一、保密信息</p>
      <p>1.1 “保密信息”在本协议项下是指乙方在本协议签署之前或之后、直接或间接从甲方处获 知尚未公开披露的、具有商业价值的信息；</p>
      <p>1.2 “保密信息”可以是以任何方式披露的，包括但不限于信函、传真、备忘、纪要、协议、 报告、方案、电子邮件等，或以口头方式披露并以书面方式确认的任何信息或数据；</p>
      <p>1.3 “保密信息”包括但不限于下述事项：</p>
      <p>1.3.1 技术信息：包括技术方案、设计要求、服务内容、实现方法、运作流程、技术指标、 软件系统、数据库、运行环境、作业平台、测试结果、图纸、样本、模型、使用手册、技术 文档、涉及技术秘密的业务函电等等；</p>
      <p>1.3.2 经营信息：包括闪购运营规则、闪购销售政策、商业计划、商业运营方案、合作客户 资料、需求信息、营销计划、采购资料、定价政策、进货渠道、产销策略、项目组人员构成、 费用预算、利润情况及财务资料等；</p>
      <p>1.3.3 其他事项：甲方未公开披露的其他保密信息；</p>
      <br/>
      <p>二、保密义务</p>
      <p>2.1 甲方已将保密信息范围和要求告知乙方，乙方对此也已充分了解。</p>
      <p>2.2 基于乙方接触甲方保密信息，乙方在此承诺对保密信息予以严格保密，包括但不限于：</p>
      <p>2.2.1 应对保密信息采取合理的保密措施；</p>
      <p>2.2.2 不超出甲乙方谈判与合作的范围之外使用保密信息，且除上述范围需要外，不得使用、 复制、散布或以任何方式（包括但不限于泄露、告知、公布、发布、出版、传授、转让等方 式）向第三方披露保密信息；</p>
      <p>2.2.3 如发现甲方保密信息被泄露或者因乙方过失泄露秘密，乙方应当采取有效措施防止泄 密进一步扩大，并及时向甲方书面报告。</p>
      <p>2.3 乙方在未获得甲方事先书面批准之前不得向任何第三方披露或利用其保密信息。</p>
      <p>2.4 双方均须把保密资料的接触范围严格限制在因本协议规定目的而需接触保密资料的各 自负责任的代表的范围内。</p>
      <p>2.5 如果合作项目不再继续进行或其中一方因故退出此项目，保密资料披露方随时可以要求 对方销毁或返还，包括全部保密资料正本及副本，未经许可不得保存复制。</p>
      <p>2.6 甲乙方均应保证各方代表以不低于自己拥有保密资料的保密等级采取保密措施，但在任 何情况下，对保密资料的照料都不能低于合理程度。</p>
      <br>
      <p>三、知识产权</p>
      <p>披露方对保密资料享有知识产权，披露方将保密资料交付对方，并不构成披露方向对方及其 代表转让或许可使用商业秘密、商标、专利、技术秘密及其它知识产权权益。</p>
      <br />
      <p>四、保密资料的保存和使用</p>
			<p>4.1 甲乙双方中的任何一方有权保存必要的保密资料，以便在履行其在合作项目工作中所承 担的法律、规章与义务时使用该等保密资料。</p>
			<p>4.2 任何一方在书面通知对方并将披露的复印件抄送对方后，除有权司法机关依法要求披露 或复制保密资料外，不得在未征得披露方同意的情况下公开或再披露给任何第三方。</p>
      <br />
      <p>五、 违约责任</p>
      <p>如果乙方不履行本协议的第二条所规定的保密义务，应当承担违约责任。违约金的范围是乙 方给甲方所造成的损失包括但不限于直接损失、客户索赔损失，因此产生的诉讼费、律师费、 差旅费、相关的调查费用等。</p>
  <br>
      <p>六、争议解决和适用法律</p>
      <p>
				本协议受中华人民共和国法律管辖并按中华人民共和国法律解释。对因本协议或本协议各 方的权利和义务而发生的或与之有关的任何事项和争议、诉讼或程序，因履行本协议产生 的任何争议均可向甲方所在地人民法院提起诉讼。
      </p>
			<br />
			<p>七、协议有效期</p>
			<p>7.1 本协议自甲乙双方签字盖章之日起生效，保密期限至双方终止合作后三年。</p>
			<p>7.2 本协议壹式肆份，双方各执贰份，具有同等法律效力。</p>
      <br>
      <p>
        （以下无正文） </p>
      <div class="signContent">
        <div class="signContent-item">
          <p>
           甲方：广州闪购软件服务有限公司 
          </p>
          <p>法定代表人/其授权代表：余绍雄</p>
          <p>签字日期：</p>
        </div>
        <div class="signContent-item">
          <p>
            乙方： <span>{{contractData.name}}</span>
          </p>
          <p>法定代表人/其授权代表：{{contractData.legalPerson}}</p>
          <p>签字日期：</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      contractData: {
        default: {},
        type: Object
      }
    }
  }

</script>
<style>
	.contract1{
		padding: 30px;
	}
	
	.ct_detai{
	font-size: 14px;
	color: #333333;		
		}
	.ct_detai table{
		border: 1px solid gainsboro;
	}
	.ct_detai table td{
		border: 1px solid gainsboro;
		padding: 6px;
	}
		.ct_detai table th{
		border: 1px solid gainsboro;
	}
</style>