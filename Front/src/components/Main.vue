"vetur.validation.template": true  
<template>
	<Layout>
		<LayoutContent>
			<!-- <Card title="Список сделок" :bordered="true"> -->
			<Card title="Список сделок">
				<template #extra>
					<!-- <WarningOutlined :style="{fontSize: '16px', color: 'orange'}" /> -->
					<Input v-model="value" @change="search($event)" placeholder="Поиск сделок">
						<template #suffix>
							<SearchOutlined :style="{fontSize: '16px'}" />
							<!-- <Tooltip title="Action search" placement="right">
								<info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
							</Tooltip> -->
						</template>
					</Input>
				</template>
				<Table :dataSource="data" :columns="columns">
					<!-- <template #bodyCell="{ column }">
						<template v-if="column.key === 'action'">
							<a>Delete</a>
						</template>
					</template> -->
					<template #expandedRowRender="{ record }">
						<p style="margin: 0">
							{{ record.description }}
						</p>
					</template> 
				</Table>
			</Card>
		</LayoutContent>
	</Layout>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { Card, Input, Layout, LayoutContent, Table, Tooltip,  } from 'ant-design-vue'
	import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';

	interface lead {
		name: string;
		[key: string]: any;
	}

	const columns = [
		{ title: 'Название', dataIndex: 'name', key: 'name' },
		{ title: 'Статус', dataIndex: 'status_id', key: 'status_id' },
		{ title: 'Ответственный', dataIndex: 'responsible_user_id', key: 'responsible_user_id' },
		{ title: 'Дата создания', dataIndex: 'created_at', key: 'created_at' },
		{ title: 'Бюджет', dataIndex: 'price', key: 'price' },
	];
	let data = ref<lead[]>([{"id":824971,"name":"Покупка морепродуктов","price":600,"responsible_user_id":"Олег","group_id":0,"status_id":"Принимают решение","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681646994,"updated_at":1681647077,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/824971?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558243,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558243?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558245,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558245?with=contacts&page=1&limit=50"}}}]}},{"id":825005,"name":"Закупка техники","price":550,"responsible_user_id":"Олег","group_id":0,"status_id":"Переговоры","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681647221,"updated_at":1681647255,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/825005?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558279,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558279?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558281,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558281?with=contacts&page=1&limit=50"}}}]}}])
	// data =	[{"id":824971,"name":"Покупка морепродуктов","price":600,"responsible_user_id":"Олег","group_id":0,"status_id":"Принимают решение","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681646994,"updated_at":1681647077,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/824971?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558243,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558243?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558245,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558245?with=contacts&page=1&limit=50"}}}]}},{"id":825005,"name":"Закупка техники","price":550,"responsible_user_id":"Олег","group_id":0,"status_id":"Переговоры","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681647221,"updated_at":1681647255,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/825005?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558279,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558279?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558281,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558281?with=contacts&page=1&limit=50"}}}]}}];
	export default defineComponent({
		name: 'Main',
		// props: {
		// 	// msg: String,
		// },
		components: {
			Layout,
			LayoutContent,
			Table,
			Card,
			Input,
			Tooltip,
			WarningOutlined,
			SearchOutlined,
		},
		setup() {
			const value = ref<string>('');
			return {
				value,
			  data,
      	columns,
			};
		},
		methods: {
			search(event: { data: any; [key: string]: any;}) {
				console.log(event.data)
				fetch('http://vladimir2ht.ddns.net:4000/'+ ((event.data) ? event.data : ''))
			},
		}
	});
</script>

<style scoped lang="scss">
	.ant-card {
		background: white;
	}
	.ant-layout {
		padding: 5%;

	}
</style>
