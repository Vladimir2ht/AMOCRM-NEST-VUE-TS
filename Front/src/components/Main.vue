"vetur.validation.template": true
<template>
	<Layout>
		<LayoutContent>
			<Card title="Список сделок">
				<template #extra>
					<Tooltip title="Поиск работает от 3 символов" placement="top">
						<WarningOutlined v-if="lessSymbols" :style="{fontSize: '16px', color: 'orange'}" />
					</Tooltip>
					<div @click.capture="refocus()">
						<Input @change="search($event)" ref="inputField" placeholder="Поиск сделок">
							<template #suffix>
								<LoadingOutlined v-if="loading" :style="{fontSize: '16px'}" />
								<SearchOutlined v-else :style="{fontSize: '16px'}" />
							</template>
						</Input>
					</div>
				</template>
				<Table :dataSource="leadsData" :columns="columns" :loading="loading" :pagination="false">
					<!-- <template #expandedRowRender="{ record }">
						<p style="margin: 0">
							{{ record.description }}
						</p>
					</template>  -->
				</Table>
			</Card>
		</LayoutContent>
	</Layout>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { Card, Input, Layout, LayoutContent, Table, Tooltip  } from 'ant-design-vue';
	import { LoadingOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons-vue';

	interface Lead {
		name: string;
		status_id: string;
		responsible_user_id: string;
		price: number;
		created_at: number | string;
		[key: string]: any;
	}

	const columns = [
		{ title: 'Название', dataIndex: 'name', key: 'id' },
		{ title: 'Статус', dataIndex: 'status_id', key: 'id' },
		{ title: 'Ответственный', dataIndex: 'responsible_user_id', key: 'id' },
		{ title: 'Дата создания', dataIndex: 'created_at', key: 'id' },
		{ title: 'Бюджет', dataIndex: 'price', key: 'id' },
	];
	// let leadsData = ref<any>([{"id":824971,"name":"Покупка морепродуктов","price":600,"responsible_user_id":"Олег","group_id":0,"status_id":"Принимают решение","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681646994,"updated_at":1681647077,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/824971?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558243,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558243?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558245,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558245?with=contacts&page=1&limit=50"}}}]}},{"id":825005,"name":"Закупка техники","price":550,"responsible_user_id":"Олег","group_id":0,"status_id":"Переговоры","pipeline_id":6691762,"loss_reason_id":null,"created_by":9496334,"updated_by":9496334,"created_at":1681647221,"updated_at":1681647255,"closed_at":null,"closest_task_at":null,"is_deleted":false,"custom_fields_values":null,"score":null,"account_id":31001782,"labor_cost":null,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/leads/825005?with=contacts&page=1&limit=50"}},"_embedded":{"tags":[],"companies":[{"id":1558279,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/companies/1558279?with=contacts&page=1&limit=50"}}}],"contacts":[{"id":1558281,"is_main":true,"_links":{"self":{"href":"https://gafale7819.amocrm.ru/api/v4/contacts/1558281?with=contacts&page=1&limit=50"}}}]}}])
	let leadsData = ref<Lead[]>([]);
	let loading = ref<boolean>(true);
	let lessSymbols = ref<boolean>(false);

	export default defineComponent({
		name: 'Main',
		components: {
			Layout,
			LayoutContent,
			Table,
			Card,
			Input,
			Tooltip,
			WarningOutlined,
			SearchOutlined,
			LoadingOutlined,
		},
		data() {
			return {
			  leadsData,
			};
		},
		setup() {
			return {
				loading,
				lessSymbols,
      	columns,
			};
		},
		methods: {
			async search(event: {[key: string]: any; srcElement: {_value: string};}): Promise<void> {
				await this.$nextTick();
				await this.$nextTick(); // одного иногда не хвататет, чтобы получилось нужное значение.
				let url: string = event.srcElement._value;

				if (url && url.length < 3) {
					lessSymbols.value = true;
					return
				}	else lessSymbols.value = false;
				loading.value = true;

				url = 'http://vladimir2ht.ddns.net:4000/' + ((url) ? '?q=' + url : '');
				const response: Response = await fetch(url, {
					method: 'GET',
					headers: { 'Origin': 'http://localhost:8080/' }
				});
				const responseData: Lead[] = await response.json();
				
				responseData.forEach(lead => {
					lead.created_at = new Date((lead.created_at as number) * 1000).toLocaleDateString();
				});
				
				loading.value = false;
				leadsData.value = responseData;
			},
			refocus() {
				this.$nextTick(() => (this.$refs.inputField as any).focus());
			}
		},
		mounted() {
    	if (this.$refs.inputField) {this.search({srcElement: {_value: ''}})};
  	},
	});
</script>

<style scoped lang="scss">
	#app .ant-layout {
		padding: 5%;
		
		.ant-layout-content {
			min-width: 625px;

			.anticon-warning {
				margin: auto 10px auto 0;
			}

			.anticon-search {
				cursor: pointer;
			}
		}
	}
</style>
