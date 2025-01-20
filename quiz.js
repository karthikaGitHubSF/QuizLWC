import { LightningElement,track } from 'lwc';
import LightningAlert from 'lightning/alert';


export default class Quiz extends LightningElement {
    isModalOpen=false;
    name=''; @track email='';show1=false; Evaluated=false; show2=false; show3=false;
    currentTime='00:00:00'; elapsedSeconds=0; show=false; q1value=''; q2value=''; q3value='';
    selectedValues = []; score=0; final=false; intervalId=0;

    get options1() {
        return [
            { label: 'dispatchEvent', value: 'q1option1' },
            { label: 'addEventListener', value: 'q1option2' },
            { label: 'sendEvent', value: 'q1option3' }
        ];
    }

    get options2() {
        return [
            { label: '@api ', value: 'q2option1' },
            { label: '@public', value: 'q2option2' },
            { label: '@track', value: 'q2option3' }
        ];
    }

    get options3() {
        return [
            { label: 'Shadow DOM ', value: 'q3option1' },
            { label: 'Virtual DOM', value: 'q3option2' },
            { label: 'Light DOM', value: 'q3option3' }
        ];
    }
    handleChoice(event)
    {
        console.log(event.target.value);
        if(event.target.label=='Radio Group1')
            this.q1value = event.detail.value;
        else if(event.target.label=='Radio Group2')
            this.q2value = event.detail.value;
        else if(event.target.label=='Radio Group3')
            this.q3value = event.detail.value;
        if(event.target.value=='q1option1' || event.target.value=='q2option1' || event.target.value=='q3option1')
           {
             this.score+=5;
             this.Evaluated=true;
           }
        else if((event.target.value!='q1option1' || event.target.value!='q2option1' || event.target.value!='q3option1') && this.Evaluated==true)
           { this.Evaluated=false;
             this.score-=5;
           }
           
    }
   
    handlePrev(event)
    {
        if(this.show2==true)
            {
                this.show1=true;
                this.show2=false;
                this.refs.prev.disabled=true;
                this.refs.next.disabled=false;
            }
            else if(this.show3==true)
            {
                this.show3=false;
                this.show2=true;
                this.refs.next.disabled=false;
                this.refs.next.disabled=false;
            }
    }
    handleNext(event)
    {
        if(this.show1==true)
        {
            this.show1=false;
            this.show2=true;
            this.refs.prev.disabled=false;
            this.refs.next.disabled=false;
            this.Evaluated=false;
        }
        else if(this.show2==true)
        {
            this.show2=false;
            this.show3=true;
            this.refs.next.disabled=true;
            this.Evaluated=false;
        }
        
    }
    handleReset(event)
    {
        console.log('reset');
        console.log(event.target.label);
        if (event.target.label === 'Close')
            {
                console.log('close');
                    this.name=''; this.email=''; 
                this.refs.Name.value='';
                this.refs.Email.value='';
            }
        this.show=false; 
        this.Evaluated=false;
        //this.currentTime='00:00:00'; 
        clearInterval(this.intervalId);
        this.elapsedSeconds=0;
        this.selectedValues = ''; 
        this.score=0;
        this.final=false;
        this.q1value=''; this.q2value=''; this.q3value='';
        this.refs.q1.value =  this.q1value; 
        this.refs.q2.value =  this.q2value; 
        this.refs.q3.value = this.q3value; 
       
         
    }

    
    handleSubmit(event)
    {
        this.final=true;
        this.show1=false;
        this.show2=false;
        this.show3=false;
        clearInterval(this.intervalId);
        if(this.score >= 10)
            this.greetings='Congratulations';
        else
            this.greetings='Good Try';
        
    }
    
    formatTime(totalSeconds) 
    {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    handleChange(event)
    {
        if(event.target.label=='Name')
         this.name=event.target.value;
        else if(event.target.label=='Email')
        { 
            this.email=event.target.value;
        }
    }

    handleConfirm(event)
    {
        console.log('start')
        if(this.refs.Name.value !='' && this.refs.Email.reportValidity() )
        {
            
                console.log(this.refs.Name.value)
                console.log('checked')
                this.isModalOpen=true;
       } 
            
        else
           {
            console.log('invalid')
            LightningAlert.open({
                message: 'Check your Credentials',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });
           }
       
    }

    closeModal()
    {
        this.isModalOpen=false;
    }

    handleClick(event)
    {
        console.log(event.target.label);
        
        this.show1=true;
        this.show=true;

            this.intervalId = setInterval(() => {
            this.elapsedSeconds++;
            this.currentTime = this.formatTime(this.elapsedSeconds);
        }, 1000);
        console.log(this.currentTime);
    }
}