viewModel.index = {}
var idx = viewModel.index

idx.prepareGrid1 = () => {
	let data = [
		{ id: 'n001', name: 'Noval Agung', gender: 'male', address: 'Margorejo Indah B920, Wonocolo' },
		{ id: 'n002', name: 'Arfian Bagus', gender: 'male', address: 'Imam Bonjol 120, Dr. Soetomo' },
		{ id: 'n003', name: 'Alip Sidik', gender: 'male', address: 'Margorejo Indah B920, Wonocolo' },
		{ id: 'n004', name: 'Rino Sukmandityo', gender: 'male', address: 'Imam Bonjol 120, Dr. Soetomo' },
		{ id: 'n005', name: 'Adinda Martha', gender: 'female', address: 'Margorejo Indah B920, Wonocolo' },
		{ id: 'n006', name: 'Ainurrochman', gender: 'male', address: 'Imam Bonjol 120, Dr. Soetomo' },
		{ id: 'n007', name: 'Aris Meika', gender: 'male', address: 'Margorejo Indah B920, Wonocolo' }
	]
	let columns = [
		{ title: 'ID', field: 'id', width: 80 },
		{ title: 'Name', field: 'name', attributes: { class: 'bold' } },
		{ title: 'Gender', field: 'gender', width: 100, attributes: { class: 'align-center' }, template: (d) => {
			let color = (d.gender == 'male') ? 'blue' : 'green'
			return `<span class='tag bg-${color}'>${d.gender}</span>`
		} },
		{ title: 'Address', field: 'address' }
	]

	$('.grid-1').kendoGrid({
		dataSource: {
			data: data,
			pageSize: 10
		},
		columns: columns,
		pageable: true,
		filterable: false,
		resizable: false
	})
}

idx.prepareChart1 = () => {
	let data = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((d) => {
		return { 
			day: d, 
			arfianCommits: app.randomRange(2, 20), 
			marthaCommits: app.randomRange(2, 20), 
			ainurCommits: app.randomRange(2, 20)
		}
	})

	let series = [
		{ name: 'Arfian\'s Commits', field: 'arfianCommits', type: 'line', width: 3, color: app.seriesColorsGodrej[0], markers: {
			visible: true,
			style: 'smooth',
			background: app.seriesColorsGodrej[0]
		} },
		{ name: 'Martha\'s Commits', field: 'marthaCommits', type: 'line', width: 3, color: app.seriesColorsGodrej[1], markers: {
			visible: true,
			style: 'smooth',
			background: app.seriesColorsGodrej[1]
		}  },
		{ name: 'Ainur\'s Commits', field: 'ainurCommits', type: 'line', width: 3, color: app.seriesColorsGodrej[2], markers: {
			visible: true,
			style: 'smooth',
			background: app.seriesColorsGodrej[2]
		}  }
	]

	$('.chart-1').kendoChart({
		dataSource: {
			data: data
		},
		series: series,
		categoryAxis: {
			field: 'day',
			majorGridLines: {
				color: '#fafafa'
			},
			labels: {
				font: 'Source Sans Pro 11',
				template: (d) => `${app.capitalize(d.value).slice(0, 3)}`
			}
		},
		legend: {
			position: 'right'
		},
		valueAxis: {
			majorGridLines: {
				color: '#fafafa'
			}
		},
		tooltip: {
			visible: true,
			template: (d) => `${d.series.name} on ${d.category}: ${d.value}`
		}
	})
}

idx.prepareChart2 = () => {
	let data = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((d) => {
		return { 
			day: d, 
			arfianCommits: app.randomRange(2, 20), 
			marthaCommits: app.randomRange(2, 20), 
			ainurCommits: app.randomRange(2, 20)
		}
	})

	let series = [
		{ name: 'Arfian\'s Commits', field: 'arfianCommits' },
		{ name: 'Martha\'s Commits', field: 'marthaCommits' },
		{ name: 'Ainur\'s Commits', field: 'ainurCommits' }
	]

	$('.chart-2').kendoChart({
		dataSource: {
			data: data
		},
		seriesDefaults: {
			type: 'column',
			stack: true,
			overlay: {
				gradient: 'none'
			},
			border: {
				width: 0
			}
		},
		series: series,
		seriesColors: app.seriesColorsGodrej,
		categoryAxis: {
			field: 'day',
			majorGridLines: {
				color: '#fafafa'
			},
			labels: {
				font: 'Source Sans Pro 11',
				template: (d) => `${app.capitalize(d.value).slice(0, 3)}`
			}
		},
		legend: {
			visible: false
		},
		valueAxis: {
			majorGridLines: {
				color: '#fafafa'
			}
		},
		tooltip: {
			visible: true,
			template: (d) => `${d.series.name} on ${d.category}: ${d.value}`
		}
	})
}

$(() => {
	idx.prepareChart1()
	idx.prepareChart2()
	idx.prepareGrid1()
})