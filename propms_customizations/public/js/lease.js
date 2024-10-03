frappe.ui.form.on('Lease', {
	refresh: function(frm){
        
        if (!frm.doc.custom_brokerage_invoice && frm.doc.custom_brokerage_amount){
            frm.add_custom_button("Make Brokerage Invoice",function(){
                frappe.call({
                    method: 'propms_customizations.api.make_brokerage_invoice',
                    args:{
                        customer: frm.doc.lease_customer,
                        amount: frm.doc.custom_brokerage_amount
                    },
                    callback: function(r){
                        frm.set_value("custom_brokerage_invoice",r.message.name);
                        frm.refresh_field("custom_brokerage_invoice");
                        frm.save()
                    }
                })
            })
        }
    }
})
