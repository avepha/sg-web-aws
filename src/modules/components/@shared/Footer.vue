<template>
  <!-- PAGE FOOTER -->
		<div class="page-footer">
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<span class="txt-color-white">Intelligence Agro - Smart Grobot {{getVersion}}<span class="hidden-xs"> </span> © 2017</span>
				</div>
			</div>
		</div>
		<!-- END PAGE FOOTER -->
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters(['getVersion'])
    },
  }
</script>
